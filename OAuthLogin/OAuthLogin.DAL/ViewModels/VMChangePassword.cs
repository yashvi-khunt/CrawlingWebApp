using System.ComponentModel.DataAnnotations;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMChangePassword
    {


        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
