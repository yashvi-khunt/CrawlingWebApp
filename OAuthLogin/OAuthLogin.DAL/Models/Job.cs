using System.ComponentModel.DataAnnotations.Schema;

namespace OAuthLogin.DAL.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string URL { get; set; }
        
        public DateTime CreatedDate { get; set; }

        [ForeignKey(nameof(ApplicationUser.Id))]
        public string CreatedBy { get; set; }
        

    }
}
