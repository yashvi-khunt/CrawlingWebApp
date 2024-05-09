using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.BLL.Services;
using OAuthLogin.DAL.ViewModels;


namespace OAuthLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CrawlerController : ControllerBase
    {
        private readonly ICrawlerService _crawlerService;
        public CrawlerController(ICrawlerService crawlerService)
        {
            _crawlerService = crawlerService;
                }

        [HttpGet]
        [Route("GetData/{jobId}")]
        public IActionResult GetData(int jobId)
        {
            //var parentjobId = BackgroundJob.Enqueue(() => _crawlerService.GetData(jobId));
            var result =  _crawlerService.GetData(jobId);
            if(result.IsCompleted)
            {
                _crawlerService.GetDetailsData(jobId);
            }
            //Continuations Job - this job executed when its parent job is executed.
            //BackgroundJob.ContinueJobWith(parentjobId, () => _crawlerService.GetDetailsData(jobId));

            return Ok("Data loaded successfully!");
        }

        [HttpPost]
        [Route("AddJob")]
        public  IActionResult AddJob(VMAddCrawlingJob vMAddCrawlingJob)
        {
            var response =  _crawlerService.AddCrawlingJob(vMAddCrawlingJob);
            if (response.IsCompletedSuccessfully)
                return Ok(new Response("Data Added Successfully!",true));
            else return StatusCode(500, new Response("Something went wrong.",false));
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
        public IActionResult<List<VMJobResponseForJobId>> GetJobsForId(int JobId)
        {

        }
    }
}
