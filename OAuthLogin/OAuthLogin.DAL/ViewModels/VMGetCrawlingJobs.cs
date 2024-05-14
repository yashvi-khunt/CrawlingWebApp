
namespace OAuthLogin.DAL.ViewModels
{
    public  class VMSpGetCrawlingJobs
    {
        public long Id { get; set; }
        public int JobId { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedDate{ get; set; }
       
        public string? URL{ get; set; }
        public int ResultCount { get; set; }

        public string CreatedBy { get; set; }
        public DateTime? LastExecuted {  get; set; }
        public int RecJob {  get; set; }
    }

    public class VMGetCrawlingJobs
    {
        public int Count { get; set; }

        public List<VMSpGetCrawlingJobs>? CrawlingJobs{ get; set; }
    }

    public class VMGetCrawlingJobsInput : StoredProcedureInputModel
    {
        //public string? Text { get; set; }
        //public string? FromDate { get; set; }

        //public string? ToDate { get; set; }

        public string? UserIds { get; set; }
    }
}

