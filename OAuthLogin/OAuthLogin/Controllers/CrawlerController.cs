using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OAuthLogin.BLL.Repositories;


namespace OAuthLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
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
            var parentjobId = BackgroundJob.Enqueue(() => _crawlerService.GetData(jobId));

            //Continuations Job - this job executed when its parent job is executed.
            BackgroundJob.ContinueJobWith(parentjobId, () => _crawlerService.GetDetailsData(jobId));

            return Ok("Data loaded successfully!");
        }
    }
}
