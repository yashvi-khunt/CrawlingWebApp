
namespace OAuthLogin.DAL.ViewModels
{
    public class ParameterModel
    {
        public string Param { get; set; }
        public string Xpath { get; set; }

        public string? Attribute { get; set; } = "textContent";
        public bool IsLevelParam { get; set; } 
    }
    public class VMAddCrawlingJob
    {
        public string JobName { get; set; }
        public string URL { get; set; }
        public List<ParameterModel> Parameters { get; set; }
    }
}
