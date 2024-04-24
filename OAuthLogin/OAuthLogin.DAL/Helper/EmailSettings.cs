
namespace OAuthLogin.DAL.Helper
{
    public class EmailSettings
    {
        public string SenderEmail { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public string DisplayName { get; set; }
        public int Port { get; set; }

    }


    public class GoogleAuthConfig
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}
