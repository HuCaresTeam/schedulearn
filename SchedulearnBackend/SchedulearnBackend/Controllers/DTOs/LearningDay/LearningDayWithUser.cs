using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class LearningDayWithUser
    {
        public LearningDayWithUser(LearningDay learningDay)
        {
            Id = learningDay.Id;
            RowVersion = learningDay.RowVersion;
            Description = learningDay.Description;
            DateFrom = DateTime.SpecifyKind(learningDay.DateFrom, DateTimeKind.Utc);
            DateTo = DateTime.SpecifyKind(learningDay.DateTo, DateTimeKind.Utc);

            UserId = learningDay.User.Id;
            Name = learningDay.User.Name;
            Surname = learningDay.User.Surname;
            JobTitle = learningDay.User.JobTitle.Title;

            TopicId = learningDay.Topic.Id;
            TopicTitle = learningDay.Topic.Name;
        }

        public int Id { get; set; }
        public byte[] RowVersion { get; set; }
        public string Description { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string JobTitle { get; set; }

        public int TopicId { get; set; }
        public string TopicTitle { get; set; }
    }
}
