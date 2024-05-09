namespace OAuthLogin.BLL.SQLRepository
{
    public static class StoredProcedure
    {
        public const string GetUsers = "[usp_Get_Users]";
        public const string GetLoginHistory = "[usp_Get_Login_History]";
        public const string AddLoginHistory = "[usp_Add_Login_Histories]";
        public const string GetUsersWithNames = "[usp_Get_Users_With_Names]";
        public const string UpdateUserRoles = "[usp_Update_User_Role]";
        public const string GetCrawlingJobs = "[usp_Get_Crawling_Jobs]";
        public const string GetResponseForJobId = "[usp_Get_Respone_For_JobId]";
    }
}
