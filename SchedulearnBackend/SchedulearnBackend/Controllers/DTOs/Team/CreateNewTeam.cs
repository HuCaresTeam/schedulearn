using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class CreateNewTeam
    {
        public int LimitId { get; set; }
        public int ManagerId { get; set; }

        public Team CreateTeam()
        {
            return new Team()
            {
                LimitId = LimitId,
                ManagerId = ManagerId
            };
        }
    }
}
