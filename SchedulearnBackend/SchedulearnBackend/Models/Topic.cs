using DotNetify;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Ignore]
        [JsonIgnore]
        public virtual Topic ParentTopic { get; set; }
        public virtual ICollection<Topic> SubTopics { get; set; }
    }
}
