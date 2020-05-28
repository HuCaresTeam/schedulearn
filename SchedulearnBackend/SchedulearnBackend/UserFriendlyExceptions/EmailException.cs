using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class EmailException : UserFriendlyException
    {
        public EmailException() : this(null)
        {
        }

        public EmailException(string message) : this(message, null)
        {
        }

        public EmailException(string message, Exception inner) : base(HttpStatusCode.InternalServerError, message, inner)
        {
        }
    }
}
