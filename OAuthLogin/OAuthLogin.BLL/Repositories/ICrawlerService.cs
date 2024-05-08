
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;

namespace OAuthLogin.BLL.Repositories
{
    public interface ICrawlerService
    {
         Task<List<JobResponse>> GetData(int JobId);
        public void GetDetailsData(int JobId);
        Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob);
    }
}
