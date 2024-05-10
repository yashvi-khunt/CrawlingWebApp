
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;

namespace OAuthLogin.BLL.Repositories
{
    public interface ICrawlerService
    {
        Task TriggerJob(int jobId);
        Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob);
        Task<VMGetCrawlingJobs> GetAllCrawlingJobs(VMGetCrawlingJobsInput vMGetHistoriesInput);
        Task<List<VMJobResponseForJobId>> GetResponseForJobId(int JobId);
    }
}
