using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class FlatLearningDay
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }

        public FlatLearningDay()
        {
        }

        public FlatLearningDay(LearningDay learningDay)
        {
            Id = learningDay.Id;
            TopicId = learningDay.TopicId;
            DateFrom = DateTime.SpecifyKind(learningDay.DateFrom, DateTimeKind.Utc);
            DateTo = DateTime.SpecifyKind(learningDay.DateTo, DateTimeKind.Utc);
            Description = learningDay.Description;
            Title = learningDay.Topic.Name;
            UserId = learningDay.UserId;
        }
    }
}
