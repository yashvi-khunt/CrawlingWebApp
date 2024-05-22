
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;

namespace OAuthLogin.BLL.Repositories
{
    public interface ICrawlerService
    {
        Task TriggerJob(int jobId);
        Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob, string userId);
        Task<VMGetCrawlingJobs> GetAllCrawlingJobs(VMGetCrawlingJobsInput vMGetHistoriesInput);
        Task<List<VMJobResponseForJobId>> GetResponseForJobId(int JobId);
        Task<VMAddCrawlingJob> GetFormByJobId(int jobId);
        Task<Job> EditCrawlingJob(int jobId, VMAddCrawlingJob vMAddCrawlingJob, string userId);
    }
}
