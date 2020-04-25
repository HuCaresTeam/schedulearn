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
        private readonly UserContext _userContext;
        private User CurrentUser { get; set; }

        private IEnumerable<User> AllUsers
        {
            get { return _userContext.Users.ToList(); }
        }

        public UserBaseVM(UserContext userContext)
        {
            _userContext = userContext;
        }

        public Action<User> SetCurrentUser => user =>
        {
            CurrentUser = _userContext.Users.Where(u => u.Name == user.Name).First();
            if (CurrentUser == null)
            {
                CurrentUser = new User()
                {
                    Name = user.Name
                };
                _userContext.Users.Add(CurrentUser);
                _userContext.SaveChanges();
            }

            Changed(nameof(CurrentUser));
            PushUpdates();
        };
    }
}
