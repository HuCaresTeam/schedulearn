using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class UnauthorizedException : UserFriendlyException
    {
        public UnauthorizedException() : this(null)
        {
        }

        public UnauthorizedException(string message) : this(message, null)
        {
        }

        public UnauthorizedException(string message, Exception inner) : base(HttpStatusCode.Unauthorized, message, inner)
        {
        }
    }
}
