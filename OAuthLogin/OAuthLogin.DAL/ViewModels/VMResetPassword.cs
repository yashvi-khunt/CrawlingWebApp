using System.ComponentModel.DataAnnotations;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMResetPassword
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Token is required")]
        public string Token { get; set; }

    }
}
