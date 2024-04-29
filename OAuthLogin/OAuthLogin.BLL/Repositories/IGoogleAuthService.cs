using OAuthLogin.BLL.Helpers;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;


namespace OAuthLogin.BLL.Repositories
{
    public interface IGoogleAuthService
    {
        Task<BaseResponse<ApplicationUser>> GoogleSignIn(VMGoogleSignin model);
    }
}
