using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class ConcurrencyException : UserFriendlyException
    {
        public ConcurrencyException() : this(null)
        {
        }

        public ConcurrencyException(string message) : this(message, null)
        {
        }

        public ConcurrencyException(string message, Exception inner) : base(HttpStatusCode.Conflict, message, inner)
        {
        }
    }
}
