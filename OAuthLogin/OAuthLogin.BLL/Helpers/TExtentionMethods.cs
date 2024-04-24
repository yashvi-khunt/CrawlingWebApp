using Microsoft.Data.SqlClient;
using OAuthLogin.BLL.SQLRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OAuthLogin.BLL.Helpers
{
    public static class TExtentionMethods
    {
        //private static readonly ILogger logger = Log.ForContext(typeof(TExtentionMethods));

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            List<PropertyInfo> properties = temp.GetProperties().ToList();

            foreach (DataColumn column in dr.Table.Columns)
            {
                try
                {
                    PropertyInfo propertyInfo = properties.Where(prop => prop.Name == column.ColumnName).FirstOrDefault();

                    if (propertyInfo != null && dr[column.ColumnName] != DBNull.Value)
                    {
                        propertyInfo.SetValue(obj, dr[column.ColumnName], null);
                    }
                }
                catch (Exception EX)
                {
                    throw;
                }
            }

            return obj;
        }

        public static T ChangeType<T>(this object args)
        {
            try
            {
                return (T)Convert.ChangeType(args, typeof(T));
            }
            catch (Exception)
            {
                return default;
            }
        }

        public static List<T> ToList<T>(this DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        public static T MapToSingle<T>(this SqlDataReader dr)
        {
            Type Entity = typeof(T);
            T RetVal = Activator.CreateInstance<T>();
            Dictionary<string, PropertyInfo> PropDict = new Dictionary<string, PropertyInfo>();

            try
            {
                if (dr != null && dr.HasRows)
                {
                    PropertyInfo[] Props = Entity.GetProperties(BindingFlags.Instance | BindingFlags.Public);
                    PropDict = Props.ToDictionary(item => item.Name.ToUpper(), prop => prop);
                    dr.Read();

                    for (int Index = 0; Index < dr.FieldCount; Index++)
                    {
                        if (PropDict.ContainsKey(dr.GetName(Index).ToUpper()))
                        {
                            PropertyInfo Info = PropDict[dr.GetName(Index).ToUpper()];
                            if (Info != null && Info.CanWrite)
                            {
                                var Val = dr.GetValue(Index);
                                Info.SetValue(RetVal, Val == DBNull.Value ? null : Val, null);
                            }
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
            }
            return RetVal;
        }

        public static List<T> MapToList<T>(this SqlDataReader dr)
        {
            List<T> RetVal = null;
            Type Entity = typeof(T);
            Dictionary<string, PropertyInfo> PropDict = new Dictionary<string, PropertyInfo>();

            try
            {
                if (dr != null && dr.HasRows)
                {
                    RetVal = new List<T>();
                    PropertyInfo[] Props = Entity.GetProperties(BindingFlags.Instance | BindingFlags.Public);
                    PropDict = Props.ToDictionary(p => p.Name.ToUpper(), p => p);

                    while (dr.Read())
                    {
                        T newObject = Activator.CreateInstance<T>();
                        for (int Index = 0; Index < dr.FieldCount; Index++)
                        {
                            if (PropDict.ContainsKey(dr.GetName(Index).ToUpper()))
                            {
                                var Info = PropDict[dr.GetName(Index).ToUpper()];
                                if (Info != null && Info.CanWrite)
                                {
                                    var Val = dr.GetValue(Index);
                                    Info.SetValue(newObject, Val == DBNull.Value ? null : Val, null);
                                }
                            }
                        }
                        RetVal.Add(newObject);
                    }
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                throw;
            }
            return RetVal;
        }

        public static IEnumerable<TFirst> Map<TFirst, TSecond, TKey>
        (
            this List<TFirst> parent,
            List<TSecond> child,
            Func<TFirst, TKey> firstKey,
            Func<TSecond, TKey> secondKey,
            Action<TFirst, IEnumerable<TSecond>> addChildren
        )
        {

            if (child != null)
            {
                var childMap = child
              .GroupBy(secondKey)
              .ToDictionary(g => g.Key, g => g.AsEnumerable());
                if (parent != null)
                {
                    foreach (var item in parent)
                    {
                        if (childMap.TryGetValue(firstKey(item), out IEnumerable<TSecond> children))
                        {
                            addChildren(item, children);
                        }
                    }
                }

            }


            return parent;
        }


        public static SqlCommand AddParams(this SqlCommand sqlCommand, List<DBSQLParameter> SQLParameters)
        {
            if (SQLParameters != null)
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                foreach (DBSQLParameter curParam in SQLParameters)
                {
                    if (curParam.Name.StartsWith('@'))
                    {
                        sqlCommand.Parameters.AddWithValue(curParam.Name, curParam.Value ?? DBNull.Value);
                    }
                    else
                    {
                        sqlCommand.Parameters.AddWithValue($"@{curParam.Name}", curParam.Value ?? DBNull.Value);
                    }
                }
            }

            return sqlCommand;
        }

        public static dynamic ChangeType(this object args, string typesFullName)
        {
            try
            {
                if (args == DBNull.Value)
                {
                    return default(object);
                }
                else
                {
                    Type t = Type.GetType(typesFullName);
                    return Convert.ChangeType(args, t);
                }
            }
            catch (Exception Ex)
            {
                //logger.Error(Ex, Ex.Message);
                return default;
            }
        }

        public static T GetDataTableColumnValue<T>(this DataRow row, string columnname)
        {
            try
            {
                object _objColumn = row[columnname];
                return _objColumn.ChangeType<T>();
            }
            catch (Exception)
            {
                try
                {
                    var _objColumn = row.Field<object>(columnname);
                    return _objColumn.ChangeType<T>();
                }
                catch (Exception)
                {
                    return default;
                }
            }
        }


        /// <summary>
        /// Copy all properties of source class to destination
        /// </summary>
        /// <typeparam name="TFrom"> Class we want all properties of</typeparam>
        /// <typeparam name="TTo"> Class that will copy all properties</typeparam>
        /// <param name="source"></param>
        /// <param name="destination"></param>
        public static void CopyProperties<TFrom, TTo>(TFrom source, TTo destination)
        {
            var sourceProperties = typeof(TFrom).GetProperties();
            var destinationProperties = typeof(TTo).GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                var destinationProperty = destinationProperties.FirstOrDefault(p => p.Name == sourceProperty.Name);

                if (destinationProperty != null && destinationProperty.PropertyType == sourceProperty.PropertyType)
                {
                    var value = sourceProperty.GetValue(source);
                    destinationProperty.SetValue(destination, value);
                }
            }
        }
    }
}
