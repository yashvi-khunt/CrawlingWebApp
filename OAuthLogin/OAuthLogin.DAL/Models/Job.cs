
using System.ComponentModel.DataAnnotations.Schema;

namespace OAuthLogin.DAL.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string URL { get; set; }

        [ForeignKey("CreatedById")]
        public string CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastExecuted { get; set; }

    }
}
