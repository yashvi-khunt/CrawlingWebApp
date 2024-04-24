using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using OAuthLogin.DAL.Helper;
using OAuthLogin.BLL.Helpers;

namespace OAuthLogin.BLL.SQLRepository
{
   
    public class ProcedureManager : IProcedureManager
    {
        private bool disposed = false;
        private readonly OAuthDbContext dbContext;
        private readonly IConfiguration configuration;
        //private ILogger logger = Log.ForContext(typeof(ProcedureManager));

        public ProcedureManager(OAuthDbContext _dbContext, IConfiguration _configuration)
        {
            dbContext = _dbContext;
            configuration = _configuration;
        }

        private bool OpenConnection(SqlConnection connection)
        {
            bool Result = false;
            try
            {
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                    Result = connection.State == ConnectionState.Open;
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
            }
            return Result;
        }

        private void CloseConnection(SqlConnection connection)
        {
            try
            {
                if (connection.State != ConnectionState.Closed)
                {
                    connection.Close();
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
            }
        }


        private string GetConnectionString()
        {
            // Retrieve the connection string named "DefaultConnection" from appsettings.json
            return configuration.GetConnectionString("Default");
        }

        public List<DBSQLParameter> GenerateParams(object objModel, bool AddNull = false)
        {
            List<DBSQLParameter> paramList = new List<DBSQLParameter>();

            try
            {
                foreach (PropertyInfo item in objModel.GetType().GetProperties())
                {
                    if (item.GetValue(objModel) == null)
                    {
                        if (AddNull)
                        {
                            paramList.Add(new DBSQLParameter($"@{item.Name}", DBNull.Value));
                        }
                    }
                    else
                    {
                        paramList.Add(new DBSQLParameter($"@{item.Name}", item.GetValue(objModel)));
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }
            return paramList;
        }

        public bool ExecStoreProcedure(string StoreProcedure, List<DBSQLParameter> SQLParameters)
        {
            bool Result = true;

            try
            {
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        if (SQLParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in SQLParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                            }
                        }

                        if (OpenConnection(connection))
                        {
                            sqlCommand.ExecuteNonQuery();
                            CloseConnection(connection);
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            return Result;
        }

        public bool ExecStoreProcedure(string StoreProcedure, object StoreProcedureModel)
        {
            bool Result = true;

            try
            {
                List<DBSQLParameter> SQLParameters = GenerateParams(StoreProcedureModel);
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        if (SQLParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in SQLParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                            }
                        }

                        if (OpenConnection(connection))
                        {
                            sqlCommand.ExecuteNonQuery();
                            CloseConnection(connection);
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            return Result;
        }
        public List<T> ExecStoreProcedure<T>(string StoreProcedure, List<DBSQLParameter> SQLParameters)
        {
            List<T> objResult = new List<T>();
            DataTable _table = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        if (SQLParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in SQLParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                            }
                        }

                        using (var dataAdapter = new SqlDataAdapter(sqlCommand))
                        {
                            dataAdapter.Fill(_table);
                        }
                    }
                }
                if (_table != null)
                {
                    objResult = _table.ToList<T>();
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }
            return objResult;
        }

        public List<T> ExecStoreProcedure<T>(string StoreProcedure, List<DBSQLParameter> SQLParameters, List<DBSQLParameter> outputParameters)
        {
            List<T> objResult = new List<T>();
            DataTable _table = new DataTable();



            try
            {
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        if (SQLParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in SQLParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                            }
                        }

                        if (outputParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in outputParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value).Direction = ParameterDirection.Output;
                            }
                        }



                        using (var dataAdapter = new SqlDataAdapter(sqlCommand))
                        {
                            dataAdapter.Fill(_table);
                        }


                        if (outputParameters != null)
                        {
                            foreach (DBSQLParameter outputParam in outputParameters)
                            {
                                outputParam.Value = sqlCommand.Parameters[outputParam.Name].Value;
                            }
                        }
                    }
                }
                if (_table != null)
                {
                    objResult = _table.ToList<T>();
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            return objResult;
        }

        public List<T> ExecStoreProcedure<T>(string StoreProcedure, object StoreProcedureModel)
        {
            List<T> objResult = default;
            DataTable _table = new DataTable();

            try
            {
                List<DBSQLParameter> SQLParameters = GenerateParams(StoreProcedureModel);

                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        if (SQLParameters != null)
                        {
                            sqlCommand.CommandType = CommandType.StoredProcedure;

                            foreach (DBSQLParameter curParam in SQLParameters)
                            {
                                sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                            }
                        }

                        using (var dataAdapter = new SqlDataAdapter(sqlCommand))
                        {
                            dataAdapter.Fill(_table);
                        }
                    }
                }

                if (_table != null)
                {
                    objResult = _table.ToList<T>();
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            return objResult;
        }

        public List<T> ExecStoreProcedure<T>(string StoreProcedure)
        {
            List<T> objResult = default;
            DataTable _table = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                    {
                        using (var dataAdapter = new SqlDataAdapter(sqlCommand))
                        {
                            dataAdapter.Fill(_table);
                        }
                    }
                }

                if (_table != null)
                {
                    objResult = _table.ToList<T>();
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            return objResult;
        }


        public Tuple<List<TFirst>, List<TSecond>> ExecStoreProcedureMulResults<TFirst, TSecond>(string StoreProcedure, object StoreProcedureModel)
        {
            List<TFirst> firstResult = new();
            List<TSecond> secondResult = new();
            DataTable _firstTable = new DataTable();
            DataTable _secondTable = new DataTable();

            List<DBSQLParameter> SQLParameters = GenerateParams(StoreProcedureModel);
            try
            {
                using (SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString()))
                {
                    if (OpenConnection(connection))
                    {
                        using (SqlCommand sqlCommand = new SqlCommand(StoreProcedure, connection))
                        {
                            if (SQLParameters != null)
                            {
                                sqlCommand.CommandType = CommandType.StoredProcedure;

                                foreach (DBSQLParameter curParam in SQLParameters)
                                {
                                    sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                                }
                            }


                            using (var reader = sqlCommand.ExecuteReader())
                            {
                                firstResult = reader.MapToList<TFirst>();
                                reader.NextResult();
                                secondResult = reader.MapToList<TSecond>();
                                //reader.Close();
                            }




                            //using (var dataAdapter = new SqlDataAdapter(sqlCommand))
                            //{
                            //    DataSet _dataSet = new DataSet();
                            //    dataAdapter.Fill(_dataSet);

                            //    if (_dataSet.Tables.Count >= 2)
                            //    {
                            //        // Assuming the first table is of type TFirst
                            //        firstResult = _dataSet.Tables[0].ToList<TFirst>();

                            //        // Assuming the second table is of type TSecond
                            //        secondResult = _dataSet.Tables[1].ToList<TSecond>();
                            //    }
                            //}
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }

            var f = firstResult;
            var s = secondResult;

            return new Tuple<List<TFirst>, List<TSecond>>(firstResult, secondResult);
        }


        public SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection(dbContext.Database.GetConnectionString());
            return connection;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    dbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
