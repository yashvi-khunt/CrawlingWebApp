using System.ComponentModel;
using System.Text.Json;

namespace OAuthLogin.DAL.ViewModels
{
    public class Response : Response<object>
    {
        public Response(MESSAGE message, bool isSuccess = true) : base(message, isSuccess)
        {
        }

        public Response() : base() { }

        public Response(string message, bool isSuccess = true) : base(message, isSuccess)
        {
            Message = message;
            Success = isSuccess;
        }
    }

    public class Response<T>
    {
        public bool Success { get; set; } = true;
        public T? Data { get; set; }
        public string? Message { get; set; }
        

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }


        public Response(T data)
        {
            Data = data;
            Message = GetEnumDescription(MESSAGE.LOADED);
        }

      
        public Response(MESSAGE message, bool isSuccess = true)
        {
            Success = isSuccess;
            Message = GetEnumDescription(message);
        }

        public Response(string message, bool isSuccess = true)
        {
            Message = message;
            Success = isSuccess;
        }

        public Response(T data, bool isSuccess, string message)
        {
            Message = message;
            Success = isSuccess;
            Data = data;
        }

        public Response()
        {
        }

        public void UpdateStatus(MESSAGE message, bool isSuccess = false)
        {
            Success = isSuccess;
            Message = GetEnumDescription(message);
        }

        public void UpdateStatus(string message, bool isSuccess = false)
        {
            Message = message;
            Success = isSuccess;
        }

        public string GetEnumDescription(Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());
            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
    }

    public class ResponseError
    {
        public long ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }



        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }

    }

    public enum MESSAGE : int
    {
        [Description("Record saved successfully")]
        SAVED = 1,

        [Description("Record updated successfully")]
        UPDATED = 2,

        [Description("Record deleted successfully")]
        DELETED = 3,

        [Description("Record loaded successfully")]
        LOADED = 4,

        [Description("Data not found")]
        DATA_NOT_FOUND = 5,

        [Description("Already used,so you can not delete")]
        ALREADY_USED = 6,

        [Description("User logged out successfully")]
        LOGGED_OUT = 7,

        [Description("Record publish successfully")]
        PUBLISH = 8,

        [Description("UnFollow successfully")]
        UNFOLLOW = 9,

        [Description("Record not deleted")]
        NOT_DELETED = 10,

        [Description("Record is not updated properly")]
        NOT_UPDATED = 11,

        [Description("Record not added")]
        NOT_ADDED = 12,

        [Description("Data is not valid")]
        NOT_VALID = 13

    }
}

