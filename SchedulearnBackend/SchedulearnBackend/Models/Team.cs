using DotNetify;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchedulearnBackend.Models
{
    public class Team
    {
        public int Id { get; set; }

        public int LimitId { get; set; }
        public virtual Limit Limit { get; set; }

        [ForeignKey("Manager")]
        public int ManagerId { get; set; }
        [Ignore]
        [JsonIgnore]
        public virtual User Manager { get; set; }

        public virtual ICollection<User> Members { get; set; }
    }
}
