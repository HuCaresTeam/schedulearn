using DotNetify;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.BaseVMs
{
    public class LearningDayVM : BaseVM
    {
        private readonly UserContext _userContext;
        private User CurrentUser { get; set; }

        private IEnumerable<LearningDay> UserLearningDays { get; set; }

        private IEnumerable<LearningDay> AllLearningDays
        {
            get { return _userContext.LearningDays.ToList(); }
        }

        public Action<User> GetUserLearningDays => user =>
        {
            CurrentUser = _userContext.Users.Where(u => u.Name == user.Name).First();
            UserLearningDays = _userContext.LearningDays.Where(l => l.UserId == user.Id);

            Changed(nameof(CurrentUser));
            Changed(nameof(UserLearningDays));
            PushUpdates();
        };
    }
}
