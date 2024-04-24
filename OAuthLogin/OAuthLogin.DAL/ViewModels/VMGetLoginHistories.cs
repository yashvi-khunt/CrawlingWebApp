using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OAuthLogin.DAL.ViewModels
{
    public class VMSpGetLoginHistories
    {
        public long Id { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime? DateTime { get; set; }
        public string IpAddress { get; set; }
        public string? Browser { get; set; }
        public string? OS { get; set; }

        public string? Device { get; set; }
    }

    public class VMGetLoginHistories
    {
        public int Count { get; set; }

        public List<VMSpGetLoginHistories>? LoginHistories { get; set; }
    }

    public class VMGetHistoriesInput : StoredProcedureInputModel
    {
        public string? Text { get; set; }
        public string? FromDate { get; set; }

        public string? ToDate { get; set; }

        public string? UserIds { get; set; }
        public string? Browser { get; set; }
        public string? OS { get; set; }
        public string? Device { get; set; }
    }
}
