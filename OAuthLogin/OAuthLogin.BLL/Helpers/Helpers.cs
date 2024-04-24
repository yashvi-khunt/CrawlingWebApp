using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OAuthLogin.BLL.Helpers
{
    public static class Helpers
    {
        public static string ArrayToString(int[] array)
        {
            // Join the integers in the array with a comma separator
            return string.Join(",", array);
        }

        public static string ConvertToString(string[] array)
        {
            if (array == null || array.Length == 0)
                return "";

            StringBuilder result = new StringBuilder();

            for (int i = 0; i < array.Length - 1; i++)
            {
                result.Append(array[i]);
                result.Append(", ");
            }

            result.Append(array[array.Length - 1]);

            return result.ToString();
        }

        public static int CalculateDateDifference(string startDateStr, string endDateStr)
        {
            DateTime startDate = DateTime.Parse(startDateStr);
            DateTime endDate = DateTime.Parse(endDateStr);
            TimeSpan difference = endDate - startDate;
            return difference.Days + 1;
        }
    }
}
