using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class TopicNoSubtopics
    {
        public TopicNoSubtopics(Topic topic)
        {
            Id = topic.Id;
            Name = topic.Name;
            Description = topic.Description;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
