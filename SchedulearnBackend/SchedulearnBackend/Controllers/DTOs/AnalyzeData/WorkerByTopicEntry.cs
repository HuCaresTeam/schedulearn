using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class WorkerByTopicEntry
    {
        public WorkerByTopicEntry(LearningDay learningDay)
        {
            UserId = learningDay.User.Id;
            TopicId = learningDay.Topic.Id;
            Name = learningDay.User.Name;
            Surname = learningDay.User.Surname;
            JobTitle = learningDay.User.JobTitle.Title;
            DateFrom = DateTime.SpecifyKind(learningDay.DateFrom, DateTimeKind.Utc);
            DateTo = DateTime.SpecifyKind(learningDay.DateTo, DateTimeKind.Utc);
        }

        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string JobTitle { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
