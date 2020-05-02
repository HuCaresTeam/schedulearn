using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }

        public int JobTitleId { get; set; }
        public virtual JobTitle JobTitle { get; set; }
        public int? TeamId { get; set; }
        public virtual Team Team { get; set; }
        [ForeignKey("ManagerId")]
        public virtual Team ManagedTeam { get; set; }
    }
}
