
namespace OAuthLogin.DAL.ViewModels
{
    public class VmSPGetUsers
    {
        public long Id { get; set; }
        //public string? Id { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Role { get; set; }
        public bool IsActivated { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

    }
    public class VMGetUsers
    {
        public int Count { get; set; }

        public List<VmSPGetUsers>? Users { get; set; }
    }


    public class VMGetUsersInput : StoredProcedureInputModel
    {
        public string? Text { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? UserIds { get; set; }
    }
}
