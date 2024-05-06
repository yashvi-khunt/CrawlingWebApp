
using OAuthLogin.DAL.Models;

namespace OAuthLogin.BLL.Repositories
{
    public interface ICrawlerService
    {
         Task<List<JobResponse>> GetData(int JobId);
        public void GetDetailsData(int JobId);
    }
}
