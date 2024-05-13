
using System.ComponentModel.DataAnnotations.Schema;

namespace OAuthLogin.DAL.Models
{
    public class JobParameter
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Id))]
        public int JobId { get; set; }
       
        public string ParameterName { get; set; }
        public string XPath { get; set; }
        public string Attribute {  get; set; }
        public bool IsLevelParameter { get; set; }
        public virtual Job Job{ get; set; } = null!;
    }
}
