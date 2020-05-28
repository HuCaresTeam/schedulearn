using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

namespace SchedulearnBackend.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected
            var msg = "Internal server error";
            if (ex is UserFriendlyException friendlyException) {
                code = friendlyException.StatusCode;
                msg = ex.Message;
            }

            if (ex is DbUpdateConcurrencyException)
            {
                code = HttpStatusCode.Conflict;
                msg = Error_ConcurrencyException;
            }

            var result = JsonConvert.SerializeObject(new { error = msg });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
