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
        public class FlatLearningDay {
            public int Id { get; set; }
            public int TopicId { get; set; }
            public DateTime DateFrom { get; set; }
            public DateTime DateTo { get; set; }
            public string Description { get; set; }
            public string Title { get; set; }
            public int UserId { get; set; }

            public FlatLearningDay() { 
            }

            public FlatLearningDay(LearningDay learningDay) {
                Id = learningDay.Id;
                TopicId = learningDay.TopicId;
                DateFrom = DateTime.SpecifyKind(learningDay.DateFrom, DateTimeKind.Utc);
                DateTo = DateTime.SpecifyKind(learningDay.DateTo, DateTimeKind.Utc);
                Description = learningDay.Description;
                Title = learningDay.Topic.Name;
                UserId = learningDay.User.Id;
            }
        }

        public class UserLearningDayRequest { 
            public int Id { get; set; }
        }

        private readonly SchedulearnContext _schedulearnContext;
        public User CurrentUser { get; set; }

        public IEnumerable<FlatLearningDay> UserLearningDays 
        { 
            get 
            {
                if (CurrentUser == null)
                    return new List<FlatLearningDay>();

                return _schedulearnContext.LearningDays
                    .Where(l => l.UserId == CurrentUser.Id)
                    .ToList()
                    .Select(l => new FlatLearningDay(l));
            } 
        }

        public IEnumerable<FlatLearningDay> AllLearningDays
        {
            get 
            { 
                return _schedulearnContext.LearningDays
                    .ToList()
                    .Select(l => new FlatLearningDay(l))
                    .ToList(); 
            }
        }

        public LearningDayVM(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public Action<UserLearningDayRequest> GetUserLearningDays => user =>
        {
            CurrentUser = _schedulearnContext.Users.Where(u => u.Id == user.Id).FirstOrDefault();
            if (CurrentUser == null)
                throw new Exception("User does not exist");

            Changed(nameof(CurrentUser));
            Changed(nameof(UserLearningDays));
            PushUpdates();
        };

        public Action<FlatLearningDay> CreateLearningDay => learningDay =>
        {
            if (CurrentUser == null)
                throw new Exception("User must be logged in");

            var newLearningDay = new LearningDay()
            {
                UserId = CurrentUser.Id,
                TopicId = learningDay.TopicId,
                DateFrom = learningDay.DateFrom,
                DateTo = learningDay.DateTo,
                Description = learningDay.Description
            };
            _schedulearnContext.LearningDays.Add(newLearningDay);
            _schedulearnContext.SaveChanges();

            Changed(nameof(UserLearningDays));
            Changed(nameof(AllLearningDays));
            PushUpdates();
        };
    }
}
