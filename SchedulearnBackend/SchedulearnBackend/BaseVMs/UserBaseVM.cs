using DotNetify;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.BaseVMs
{
    public class UserBaseVM : BaseVM
    {
        private readonly SchedulearnContext _schedulearnContext;
        private User CurrentUser { get; set; }

        private IEnumerable<User> AllUsers
        {
            get { return _schedulearnContext.Users.ToList(); }
        }

        public UserBaseVM(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public Action<User> SetCurrentUser => user =>
        {
            CurrentUser = _schedulearnContext.Users.Where(u => u.Name == user.Name).First();
            if (CurrentUser == null)
            {
                CurrentUser = new User()
                {
                    Name = user.Name
                };
                _schedulearnContext.Users.Add(CurrentUser);
                _schedulearnContext.SaveChanges();
            }

            Changed(nameof(CurrentUser));
            PushUpdates();
        };
    }
}
