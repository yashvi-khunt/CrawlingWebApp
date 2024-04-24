using System.ComponentModel.DataAnnotations.Schema;

namespace OAuthLogin.DAL.Models
{
    public class LoginHistory
    {
        
        public int Id { get; set; }
        public string UserId {  get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }

        public DateTime DateTime { get; set; }
        public string IpAddress { get; set; }

        public string? Browser {  get; set; }

        public string? OS { get; set; }

        public string? Device {  get; set; }

    }
}
