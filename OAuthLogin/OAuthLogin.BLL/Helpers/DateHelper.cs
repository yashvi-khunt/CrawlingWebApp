using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OAuthLogin.BLL.Helpers
{
    public static class DateHelper
    {
        public static DateOnly ConvertStringToDateOnly(string dateString)
        {
            DateOnly date = new DateOnly();

            if (DateOnly.TryParseExact(dateString, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out var parsedDate))
            {
                date = parsedDate;
            }

            return date;
        }

        /// <summary>
        /// Convert "8/28/2023 12:00:00 AM" -> "YYYY-MM-DD"
        /// </summary>
        /// <param name="inputDate"></param>
        /// <returns></returns>
        public static string ConvertToYYYYMMDD(string? inputDate)
        {
            //DateTime date = DateTime.ParseExact(inputDate, "dd/MM/yyyy h:mm:ss tt", null);
            //return date.ToString("yyyy-MM-dd");


            DateTime date;
            string[] formats = { "M/d/yyyy h:mm:ss tt", "yyyy-MM-dd", "dd.MM.yyyy", "MM/dd/yyyy h:mm:ss tt", "d/MM/yyyy h:mm:ss tt" };

            if (DateTime.TryParseExact(inputDate, formats, null, System.Globalization.DateTimeStyles.None, out date))
            {
                return date.ToString("yyyy-MM-dd");
            }
            else
            {
                // Handle invalid date strings here if needed
                return "Invalid Date";
            }
        }



    }
}
