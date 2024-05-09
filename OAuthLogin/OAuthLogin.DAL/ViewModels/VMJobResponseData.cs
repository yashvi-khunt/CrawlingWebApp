
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMJobResponseData
    {
        public string ParameterName { get; set; }
        public string Value { get; set; }
       
    }

    public class VMJobResponseForJobId
    {
        public int ParamOrder { get; set; }
        public List<VMJobResponseData> Data { get; set; }
    }

    public class VMSPJobResponse
    {
        public string ParameterName { get; set; }

        public string Value { get; set; }
        public int ParamOrder { get; set; }
    }
}
