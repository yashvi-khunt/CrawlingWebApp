using AutoMapper;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        public LoginHistoryController(UserManager<ApplicationUser> userManager, IConfiguration configuration, ILoginHistoryService loginHistoryService, IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _loginHistoryService = loginHistoryService;
            _mapper = mapper;
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
    }
}
