
namespace OAuthLogin.DAL.ViewModels
{
    public class StoredProcedureCommonModel
    {

        public int? Count { get; set; }
    }

    public class HelperModel
    {
        public string? Label { get; set; }
        public string? Value { get; set; }
    }


    public class StoredProcedureInputModel
    {
        public string Field { get; set; } = "";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string Sort { get; set; } = "";
    }
}
