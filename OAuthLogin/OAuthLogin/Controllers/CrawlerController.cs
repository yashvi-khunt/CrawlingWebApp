using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;


namespace OAuthLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CrawlerController : ControllerBase
    {
        private readonly ICrawlerService _crawlerService;
        private readonly UserManager<ApplicationUser>  _userManager;
        public CrawlerController(ICrawlerService crawlerService,UserManager<ApplicationUser> userManager)
        {
            _crawlerService = crawlerService;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("GetData/{jobId}")]
        public IActionResult GetData(int jobId)
        {

            // Add or update the recurring job with the unique cron expression
            RecurringJob.AddOrUpdate<ICrawlerService>($"Job{jobId}", x => x.TriggerJob(jobId), Cron.MinuteInterval(5));
            return Ok(new Response("Data loading scheduled successfully!", true));
        }


        [HttpPost]
        [Route("AddJob")]
        public IActionResult AddJob(VMAddCrawlingJob vMAddCrawlingJob)
        {
            var user= _userManager.GetUserId(User);
            if(user == "")
            {
                return StatusCode(500, new Response("User not found.", false));
            }
            var response = _crawlerService.AddCrawlingJob(vMAddCrawlingJob,user);
            if (response.IsCompletedSuccessfully)
                return Ok(new Response("Data Added Successfully!", true));
            else return StatusCode(500, new Response("Something went wrong.", false));
        }

        [HttpGet("GetCrawlingJobs")]
        public async Task<ActionResult<List<VMGetCrawlingJobs>>> GetAllCrawlingJobs([FromQuery] VMGetCrawlingJobsInput getCrawlingJobsInput)
        {
            //var user = await _userManager.GetUserAsync(User);

            //if (User.IsInRole("User"))
            //{
            //    getLoginHistoryInputModel.UserIds = user.Id;
            //}


            var crawlingJobs = await _crawlerService.GetAllCrawlingJobs(getCrawlingJobsInput);

            //var mappedLoginHistories = _mapper.Map<VMGetLoginHistories>(loginHistories);

            //if (mappedLoginHistories == null)
            //{
            //    return NotFound(new Response(MESSAGE.DATA_NOT_FOUND, false));
            //}

            return Ok(new Response<VMGetCrawlingJobs>(crawlingJobs, true, "Data loaded successfully!"));
        }

        [HttpGet("GetResponseForJobId/{JobId}")]
        public async Task<IActionResult> GetJobsForId(int JobId)
        {
            var response = await _crawlerService.GetResponseForJobId(JobId);
            if (response != null)
            {
                return Ok(new Response<List<VMJobResponseForJobId>>(response, true, "Data loaded successfully!"));
            }
            else { return StatusCode(500, new Response("Something went wrong!", false)); }
        }
    }
}
