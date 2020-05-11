using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchedulearnBackend.Models
{
    public class Suggestion
    {
        public int Id { get; set; }
        [Required]
        public int TopicId { get; set; }
        [Required]
        public int SuggesterId { get; set; }
        [Required]
        public int SuggesteeId { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual Topic Topic { get; set; }
        [JsonIgnore]
        public virtual User Suggester { get; set; }
        public virtual User Suggestee { get; set; }

    }
}
