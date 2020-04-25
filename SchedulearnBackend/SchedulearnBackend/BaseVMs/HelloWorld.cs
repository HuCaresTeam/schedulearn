using System;
using DotNetify;
using System.Threading;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.BaseVMs
{
    public class HelloWorld : BaseVM
    {
        private readonly SchedulearnContext _schedulearnContext;
        public User CurrentUser
        {
            get
            {
                return _schedulearnContext.Users.Find(1);
            }

        }

        private Timer _timer;
        public string Greetings => "Hello World!";
        public DateTime ServerTime => DateTime.Now;
        public Topic NewTopic { get { return _schedulearnContext.Topics.Find(1); } }
        public HelloWorld(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;

            _timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
        }

        public override void Dispose() => _timer.Dispose();
    }
}
