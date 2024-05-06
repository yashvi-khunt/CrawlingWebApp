
using System.ComponentModel.DataAnnotations.Schema;

namespace OAuthLogin.DAL.Models
{
    public class JobResponse
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Id))]
        public int JobParameterId {  get; set; }
        
        public string Value { get; set; }
        public string ParamOrder {  get; set; }

        public virtual JobParameter JobParameter { get; set; }
    }
}
