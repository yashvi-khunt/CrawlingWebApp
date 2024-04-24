using System.ComponentModel.DataAnnotations;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMLogin
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
