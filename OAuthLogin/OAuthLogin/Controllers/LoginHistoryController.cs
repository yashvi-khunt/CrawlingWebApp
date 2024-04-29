using AutoMapper;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OAuthLogin.DAL.Helper;

namespace LoginSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoginHistoryController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILoginHistoryService _loginHistoryService;
        private readonly IMapper _mapper;
        private readonly OAuthDbContext _context;

        public LoginHistoryController(UserManager<ApplicationUser> userManager, IConfiguration configuration, ILoginHistoryService loginHistoryService, IMapper mapper, OAuthDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _loginHistoryService = loginHistoryService;
            _mapper = mapper;
            _context = context;
        }

        
        [HttpGet("GetLoginHistories")]
        
        public async Task<ActionResult<List<VMGetLoginHistories>>> GetAllLoginHistories([FromQuery] VMGetHistoriesInput getLoginHistoryInputModel)
        {
            var user = await _userManager.GetUserAsync(User);

            if (User.IsInRole("User"))
            {
                getLoginHistoryInputModel.UserIds = user.Id;
            }


            var loginHistories = await _loginHistoryService.GetAllLoginHistories(getLoginHistoryInputModel);

            var mappedLoginHistories = _mapper.Map<VMGetLoginHistories>(loginHistories);

            if (mappedLoginHistories  == null)
            {
                return NotFound(new Response(MESSAGE.DATA_NOT_FOUND, false));
            }

            return Ok(new Response<VMGetLoginHistories>(mappedLoginHistories, true, "Data loaded successfully!"));
        }

        [HttpGet("BrowserHelper")]
        public IActionResult GetBrowserHelper()
        {
            var uniqueBrowsers = _context.LoginHistories
                           .Select(r => r.Browser)
                           .Distinct()
                           .ToList();

            var uniqueBrowsersList = uniqueBrowsers.Select((browser, index) => new
            {
                Label = browser,
                Value = index + 1 
            }).ToList();

            return Ok(uniqueBrowsersList);
        }

        [HttpGet("OSHelper")]
        public IActionResult GetOSHelper()
        {
            var uniqueBrowsers = _context.LoginHistories
                           .Select(r => r.OS)
                           .Distinct()
                           .ToList();

            var uniqueBrowsersList = uniqueBrowsers.Select((os, index) => new
            {
                Label = os,
                Value = index + 1
            }).ToList();

            return Ok(uniqueBrowsersList);
        }

        [HttpGet("DeviceHelper")]
        public IActionResult GetDeviceHelper()
        {
            var uniqueBrowsers = _context.LoginHistories
                           .Select(r => r.Device)
                           .Distinct()
                           .ToList();

            var uniqueBrowsersList = uniqueBrowsers.Select((device, index) => new
            {
                Label = device,
                Value = index + 1
            }).ToList();

            return Ok(uniqueBrowsersList);
        }
    }
}
