using System;
using System.ComponentModel.DataAnnotations;

namespace SchedulearnBackend.Models
{
    public class LearningDay
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int TopicId { get; set; }
        [Required]
        public DateTime DateFrom { get; set; }
        [Required]
        public DateTime DateTo { get; set; }
        public string Description { get; set; }

        public virtual Topic Topic { get; set; }
        public virtual User User { get; set; }
    }
}
