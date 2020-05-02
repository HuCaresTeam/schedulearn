using DotNetify;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Models
{
    public class Team
    {
        public int Id { get; set; }
        public int LimitOfConsecutiveLearningDays { get; set; }
        public int LimitOfLearningDaysPerMonth { get; set; }
        public int LimitOfLearningDaysPerQuarter { get; set; }
        public int LimitOfLearningDaysPerYear { get; set; }
        [ForeignKey("Manager")]
        public int ManagerId { get; set; }
        [Ignore]
        public virtual User Manager { get; set; }

        public virtual ICollection<User> Members { get; set; }
    }
}
