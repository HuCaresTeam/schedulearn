using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchedulearnBackend.Models
{
    public class Topic
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int? ParentTopicId { get; set; }
        public virtual ICollection<Topic> SubTopics { get; set; }
    }
}
