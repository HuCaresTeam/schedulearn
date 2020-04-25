using System;
using DotNetify;
using System.Threading;
using SchedulearnBackend.Models;
using SchedulearnBackend.DataAccessLayer;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace SchedulearnBackend
{
    public class HelloWorld : BaseVM
    {
        private Timer _timer;
        public string Greetings => "Hello World!";
        public DateTime ServerTime => DateTime.Now;
        private readonly UserContext _userContext;
        public Topic RootTopic { get { return _userContext.Topics.Where(t => t.ParentTopicId==null).First(); } }
        public HelloWorld(UserContext userContext)
        {
            /*_timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);*/
            _userContext = userContext;
            //Changed(nameof(NewTopic));
            
        }

        //public override void Dispose() => _timer.Dispose();
    }
}