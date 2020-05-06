using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class UserFriendlyException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        public UserFriendlyException(HttpStatusCode statusCode) : this(statusCode, null, null)
        {
        }

        public UserFriendlyException(HttpStatusCode statusCode, string message) : this(statusCode, message, null)
        {
        }

        public UserFriendlyException(HttpStatusCode statusCode, string message, Exception inner) : base(message, inner)
        {
            StatusCode = statusCode;
        }
    }
}
