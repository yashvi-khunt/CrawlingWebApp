
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using OAuthLogin.BLL.Helpers;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;

using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace OAuthLogin.BLL.Services
{
    public class GoogleAuthService : IGoogleAuthService
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly OAuthDbContext _context;
        private readonly GoogleAuthConfig _googleAuthConfig;
        //private readonly ILog _logger;

        public GoogleAuthService(
            UserManager<ApplicationUser> userManager,
            OAuthDbContext context,
            IOptions<GoogleAuthConfig> googleAuthConfig
            )
        {
            _userManager = userManager;
            _context = context;
            _googleAuthConfig = googleAuthConfig.Value;
            // _logger = LogManager.GetLogger(typeof(GoogleAuthService));
        }
        public async Task<BaseResponse<ApplicationUser>> GoogleSignIn(VMGoogleSignin model)
        {
            Payload payload = new();
            try
            {
                payload = await ValidateAsync(model.Token, new ValidationSettings
                {
                    Audience = new[] { _googleAuthConfig.ClientId }
                });
            }
            catch (Exception ex)
            {
                //_logger.Error(ex.Message, ex);
                return new BaseResponse<ApplicationUser>(null, new List<string> { "Failed to get a response" });
            }

            var userToBeCreated = new ApplicationUser()
            {
                UserName = payload.Email,
                Email = payload.Email,
                CreatedDate = DateTime.Now,
                IsActivated = true,
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
            };

            var user = await _userManager.CreateUserFromSocialLogin(_context, userToBeCreated, payload.Subject);

            if (user is not null)
                return new BaseResponse<ApplicationUser>(user);

            else
                return new BaseResponse<ApplicationUser>(null, new List<string> { "Unable to link a Local User to a Provider" });
        }
    }
}
