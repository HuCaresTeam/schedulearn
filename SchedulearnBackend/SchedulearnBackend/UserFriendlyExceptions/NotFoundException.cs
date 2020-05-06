using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class NotFoundException : UserFriendlyException
    {
        public NotFoundException(): this(null) 
        {
        }

        public NotFoundException(string message) : this(message, null) 
        {
        }

        public NotFoundException(string message, Exception inner) : base(HttpStatusCode.NotFound, message, inner)
        { 
        }
    }
}
