using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SchedulearnBackend.UserFriendlyExceptions
{
    public class UniqueConstraintViolatedException : UserFriendlyException
    {
        public UniqueConstraintViolatedException() : this(null)
        {
        }

        public UniqueConstraintViolatedException(string message) : this(message, null)
        {
        }

        public UniqueConstraintViolatedException(string message, Exception inner) : base(HttpStatusCode.UnprocessableEntity, message, inner)
        {
        }
    }
}
