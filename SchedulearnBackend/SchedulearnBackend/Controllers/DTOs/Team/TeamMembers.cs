using SchedulearnBackend.Models;
using System.Collections.Generic;
using System.Linq;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class TeamMembers
    {
        public int TeamId { get; set; }
        public int ManagerId { get; set; }
        public string ManagerName { get; set; }
        public string ManagerSurname { get; set; }
        public List<SimpleUser> Users { get; set; }
        public int NumberOfTotalMembers { get; set; }

        public TeamMembers(Team accessibleTeam, List<User> memebersWhoLearnedTopic)
        {
            TeamId = accessibleTeam.Id;
            ManagerId = accessibleTeam.Manager.Id;
            ManagerName = accessibleTeam.Manager.Name;
            ManagerSurname = accessibleTeam.Manager.Surname;
            Users = memebersWhoLearnedTopic.Select(u => new SimpleUser(u)).ToList();
            NumberOfTotalMembers = accessibleTeam.Members.Count;
        }
    }
}
