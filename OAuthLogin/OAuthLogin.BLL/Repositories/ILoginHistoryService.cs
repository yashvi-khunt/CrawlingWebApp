using OAuthLogin.DAL.ViewModels;

namespace OAuthLogin.BLL.Repositories
{
    public interface ILoginHistoryService
    {
        Task<VMGetLoginHistories> GetAllLoginHistories(VMGetHistoriesInput vMGetHistoriesInput);
        Task<VMAddLoginHistoryResponse> AddLoginHistory(VMAddLoginHistory vMAddLoginHistory);
    }
}
