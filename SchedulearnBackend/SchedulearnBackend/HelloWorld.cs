using System;
using DotNetify;
using System.Threading;
using SchedulearnBackend.Models;
using SchedulearnBackend.DataAccessLayer;

namespace SchedulearnBackend
{
    public class HelloWorld : BaseVM
    {
        private Timer _timer;
        public string Greetings => "Hello World!";
        public DateTime ServerTime => DateTime.Now;
        private readonly UserContext _userContext;
        public Topic NewTopic { get { return _userContext.Topics.Find(1); } }
        public HelloWorld(UserContext userContext)
        {
            _timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
            _userContext = userContext;
            Changed(nameof(NewTopic));
        }

        public override void Dispose() => _timer.Dispose();
    }
}