using Microsoft.Data.SqlClient;
namespace OAuthLogin.BLL.SQLRepository
{
    public interface IProcedureManager : IDisposable
    {
        bool ExecStoreProcedure(string StoreProcedure, List<DBSQLParameter> SQLParameters);
        bool ExecStoreProcedure(string StoreProcedure, object StoreProcedureModel);


        List<T> ExecStoreProcedure<T>(string StoreProcedure, List<DBSQLParameter> SQLParameters);
        List<T> ExecStoreProcedure<T>(string StoreProcedure, List<DBSQLParameter> SQLParameters, List<DBSQLParameter> outputParameters);

        List<T> ExecStoreProcedure<T>(string StoreProcedure, object StoreProcedureModel);
        List<T> ExecStoreProcedure<T>(string StoreProcedure);
        Tuple<List<TFirst>, List<TSecond>> ExecStoreProcedureMulResults<TFirst, TSecond>(string StoreProcedure, object StoreProcedureModel);

        SqlConnection GetConnection();
    }
}
