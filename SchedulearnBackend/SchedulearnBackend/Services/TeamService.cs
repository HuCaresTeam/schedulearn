using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class TeamService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public TeamService(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public async Task<Team> AddNewTeamAsync(int managerId, int limitId) {
            Team newTeam = new Team()
            {
                LimitId = limitId,
                ManagerId = managerId
            };

            await _schedulearnContext.Teams.AddAsync(newTeam);
            return newTeam;
        }
    }
}
