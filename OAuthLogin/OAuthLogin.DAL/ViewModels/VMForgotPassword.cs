using System.ComponentModel.DataAnnotations;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMForgotPassword
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
    }
}
