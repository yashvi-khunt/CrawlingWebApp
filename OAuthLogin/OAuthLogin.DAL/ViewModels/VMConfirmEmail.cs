
namespace OAuthLogin.DAL.ViewModels
{
    public class VMConfirmEmail
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }


    public class VMAddConfirmEmail : VMConfirmEmail
    {
        public string PwdToken { get; set; }

    }
}
