using System;
using DotNetify;
using System.Threading;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SchedulearnBackend
{
    public class HelloWorld : BaseVM
    {
        private readonly UserContext _userContext;
        public User CurrentUser
        {
            get
            {
                return _userContext.Users.Find(1);
            }

        }

        private Timer _timer;
        public string Greetings => "Hello World!";
        public DateTime ServerTime => DateTime.Now;

        public HelloWorld(UserContext userContext)
        {
            _userContext = userContext;

            _timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
        }

        public override void Dispose() => _timer.Dispose();
    }
}