using OAuthLogin.DAL.Helper;


namespace OAuthLogin.BLL.Repositories
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
