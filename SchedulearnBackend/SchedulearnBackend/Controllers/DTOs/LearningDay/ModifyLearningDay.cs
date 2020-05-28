using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class ModifyLearningDay
    {
        public byte[] RowVersion { get; set; }
        public string Description { get; set; }
        public bool? ForceWrite { get; set; }
    }
}
