

namespace OAuthLogin.DAL.ViewModels
{
    public class VMAddLoginHistory
    {

        public string UserId { get; set; }

        public DateTime DateTime { get; set; }
        public string IpAddress { get; set; }

        public string? Browser { get; set; }

        public string? OS { get; set; }

        public string? Device { get; set; }
    }

    public class VMAddLoginHistoryResponse
    {
        public bool? IsValid { get; set; }

        public string? Message { get; set; }
    }
}
