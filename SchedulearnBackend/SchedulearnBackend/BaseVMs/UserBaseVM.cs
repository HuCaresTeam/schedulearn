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
        public class LimitsForUser
        {
            public int UserId { get; set; }
            public int LimitId { get; set; }
        }

        private readonly SchedulearnContext _schedulearnContext;
        public User CurrentUser { get; set; }

        public IEnumerable<User> AllUsers
        {
            get { return _schedulearnContext.Users.ToList(); }
        }

        public IEnumerable<JobTitle> AllJobTitles
        {
            get { return _schedulearnContext.JobTitles.ToList(); }
        }

        public UserBaseVM(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public Action<User> SetCurrentUser => user =>
        {
            CurrentUser = _schedulearnContext.Users.Where(u => u.Name == user.Name).FirstOrDefault(null);
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

        //TODO - here a transaction can be used
        public Action<User> AddNewUser => user =>
        {
            if (CurrentUser == null)
                throw new Exception("Current user not set");

            User newUser = new User()
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                JobTitleId = user.JobTitleId,
            };

            if (CurrentUser.ManagedTeam == null)
            {
                Team newTeam = new Team()
                {
                    LimitId = CurrentUser.Team.LimitId,
                    ManagerId = CurrentUser.Id
                };
                _schedulearnContext.Teams.Add(newTeam);
                newUser.TeamId = newTeam.Id;
            }
            else
            {
                newUser.TeamId = CurrentUser.ManagedTeam.Id;
            }

            _schedulearnContext.Users.Add(newUser);
            _schedulearnContext.SaveChanges();

            Changed(nameof(CurrentUser));
            PushUpdates();
        };

        public Action<LimitsForUser> ChangeLimitsForUser => teamLimits =>
        {
            Limit wantedLimit = _schedulearnContext.Limits
                .Where(l => l.Id == teamLimits.LimitId)
                .FirstOrDefault();

            if (wantedLimit == null)
            {
                throw new Exception("This combination of limits is not possible");
            }

            User wantedUser = _schedulearnContext.Users
                .Where(u => u.Id == teamLimits.UserId)
                .FirstOrDefault();

            if (wantedUser == null)
            {
                throw new Exception("This user does not exist");
            }

            wantedUser.LimitId = wantedLimit.Id;
            _schedulearnContext.SaveChanges();
        };
    }
}
