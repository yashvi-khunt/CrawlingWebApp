using OAuthLogin.BLL.Repositories;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using OAuthLogin.DAL.Models;
using UAParser;
using OAuthLogin.BLL.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;

namespace LoginSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
       
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly ILoginHistoryService _loginHistoryService;

        public AuthController(UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailService service, ILoginHistoryService loginHistoryService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailService = service;
            _loginHistoryService = loginHistoryService;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            var props = new AuthenticationProperties { RedirectUri = "https://www.google.com" };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleLogin()
        {
            var response = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (response.Principal == null) return BadRequest();

            var name = response.Principal.FindFirstValue(ClaimTypes.Name);
            var givenName = response.Principal.FindFirstValue(ClaimTypes.GivenName);
            var email = response.Principal.FindFirstValue(ClaimTypes.Email);
            //Do something with the claims
            // var user = await UserService.FindOrCreate(new { name, givenName, email});

            return Ok();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] VMLogin model
            )
        {
            var user = await _userManager.FindByEmailAsync(model.Email);


            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
            }
            var userRole = await _userManager.GetRolesAsync(user);

            if (!user.EmailConfirmed)
            {
                // User's email is not confirmed
                return StatusCode(StatusCodes.Status403Forbidden, new Response("Email is not confirmed. Please confirm your email before signing in.", false));
            }

            if(!user.IsActivated)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new Response("User not active. Please contact admin.", false));
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {

                var authClaims = new List<Claim> {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                   new Claim(ClaimTypes.NameIdentifier, user.Id),
                };

                foreach (var role in userRole)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                // Create a JWT token
                var token = GenerateJwtToken(user, authClaims);

                // Get IP address from the request
                var ipAddress = HttpContext.Connection.RemoteIpAddress.ToString();

                // Parse User-Agent header to get browser, OS, and device details
                var userAgent = Request.Headers["User-Agent"].ToString();
                var uaParser = Parser.GetDefault();
                ClientInfo clientInfo = uaParser.Parse(userAgent);

                var browser = clientInfo.UserAgent.Family;
                var operatingSystem = clientInfo.OS.Family;
                var device = clientInfo.Device.Family;

                VMAddLoginHistory vMAddLoginHistory = new VMAddLoginHistory
                {
                    UserId = user.Id,
                    IpAddress = ipAddress,
                    Browser = browser ?? "",
                    DateTime = DateTime.Now,
                    Device = device == "Other" || device is null ? "" : device,
                    OS = operatingSystem ?? "",

                };

                //var response = await _loginHistoryService.AddLoginHistory(vMAddLoginHistory);
                //if (response != null && response.IsValid == true)
                //{
                //    // Return a successful response with the generated token and its expiration
                //    return StatusCode(200, new Response<string>(token, true, "Logged in successfully!"));
                //}

                //Return a successful response with the generated token and its expiration
                return StatusCode(200, new Response<string>(token, true, "Logged in successfully! But could not save login history."));

            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
            }
        }


        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] VMRegister model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);

            if (userExists != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response("User with same email already exists.", false));


            ApplicationUser user = new ApplicationUser()
            {
                UserName = model.Email,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed = false,
                CreatedDate = DateTime.Now,
                IsActivated = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var message = String.Empty;
                foreach (var error in result.Errors)
                {
                    message += error.Description;
                }
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(message, false));
            }

            try
            {
                
                await _userManager.AddToRoleAsync(user, "User");

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var confirmationLink = Url.Action("ConfirmEmail", "Auth", new { userId = user.Id, token = token }, Request.Scheme);

                // Constructing the email template
                var emailTemplate = EmailTemplate.UserConfirmationMail(user.UserName, confirmationLink);

                MailRequest mailRequest = new MailRequest()
                {
                    RecipientEmail = model.Email,
                    Subject = "Confirmation Mail",
                    Body = emailTemplate,
                };

                await _emailService.SendEmailAsync(mailRequest);
                return Ok(new Response("User created successfully!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response("Failed to register user. Please try again later.", false));
            }
        }


        [HttpGet("ConfirmUserEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] VMConfirmEmail model)
        {
            if (model.UserId == null || model.Token == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response("User or token not found", false));

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response("User not found", false));

            //add a step to verify token

            var result = await _userManager.ConfirmEmailAsync(user, model.Token);
            if (result.Succeeded)
            {
                return Redirect("http://localhost:5173/auth/confirm-email");
            }
            else
                return StatusCode(StatusCodes.Status500InternalServerError, new Response("Something went wrong", false));
        }

        [HttpGet("ConfirmAddUserEmail")]
        public async Task<IActionResult> ConfirmAddUserEmail([FromQuery] VMAddConfirmEmail model)
        {
            if (model.UserId == null || model.Token == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response("User or token not found", false));

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound, new Response("User not found", false));

            //add a step to verify token

            var result = await _userManager.ConfirmEmailAsync(user, model.Token);
            if (result.Succeeded)
            {
                return Redirect($"http://localhost:5173/auth/confirm-email?email={user.Email}&pwd={model.PwdToken}");
            }
            else
                return StatusCode(StatusCodes.Status500InternalServerError, new Response("Something went wrong", false));
        }
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] VMForgotPassword model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return StatusCode(StatusCodes.Status202Accepted, new Response("Sent Email to user", false));



            try
            {

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var resetLink = $"http://localhost:5173/auth/reset-password?userEmail={user.Email}&token={token}";

                var emailTemplate = EmailTemplate.PasswordResetMail(user.UserName, resetLink);

                MailRequest mailRequest = new MailRequest()
                {
                    RecipientEmail = model.Email,
                    Subject = "Password Reset Mail",
                    Body = emailTemplate,
                };

                await _emailService.SendEmailAsync(mailRequest);
                return Ok(new Response("Sent password reset mail successfully!"));
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] VMResetPassword model)
        {

            //add token expiry code

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {

                var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

                if (result.Succeeded) return Ok(new Response("Password Updated Successfully", true));

                if (!result.Succeeded)
                {
                    var message = String.Empty;
                    foreach (var error in result.Errors)
                    {
                        message += error.Description;
                    }
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response(message, false));
                }

            }

            return StatusCode(StatusCodes.Status500InternalServerError, new Response("Something went wrong, Please try again.", false));

        }




        private string GenerateJwtToken(ApplicationUser user, List<Claim> claims)
        {
            // Get the JWT secret key and token validity duration from configuration
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JWT:TokenValidityInMinutes"])),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
