using System.ComponentModel.DataAnnotations;


namespace OAuthLogin.DAL.ViewModels
{
    public class VMAddUser
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        public string? RoleId { get; set; }
    }
}
