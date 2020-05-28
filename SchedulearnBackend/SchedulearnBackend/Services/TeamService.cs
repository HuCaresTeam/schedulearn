using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class TeamService
    {
        private readonly SchedulearnContext _schedulearnContext;
        private readonly LimitService _limitService;

        public TeamService(LimitService limitService, SchedulearnContext schedulearnContext)
        {
            _limitService = limitService;
            _schedulearnContext = schedulearnContext;
        }

        public async Task<List<Team>> AllTeamsAsync()
        {
            return await _schedulearnContext.Teams.ToListAsync();
        }

        public async Task<Team> GetTeamAsync(int id)
        {
            var team = await _schedulearnContext.Teams.FindAsync(id);
            return team ?? throw new NotFoundException($"Team with id ({id}) does not exist");
        }

        public async Task<Team> AddNewTeamAsync(CreateNewTeam teamToCreate) {
            var newTeam = teamToCreate.CreateTeam();

            await _schedulearnContext.Teams.AddAsync(newTeam);
            await _schedulearnContext.SaveChangesAsync();
            return newTeam;
        }

        public async Task<Team> ChangeLimitsForTeamAsync(int teamId, LimitsToApply limits)
        {
            var team = await GetTeamAsync(teamId);
            var wantedLimit = await _limitService.GetLimitAsync(limits.LimitId);
                
            team.LimitId = wantedLimit.Id;
            _schedulearnContext.Update(team);
            await _schedulearnContext.SaveChangesAsync();

            return team;
        }

        public async Task<List<Team>> GetAllTeamsBelowTeam(int teamId)
        {
            var baseTeam = await GetTeamAsync(teamId);
            var teamsBelowManager = await GetAllTeamsBelowManager(baseTeam.ManagerId);
            return teamsBelowManager.Where(team => team.Id != teamId).ToList();
        }

        public async Task<List<Team>> GetAllTeamsBelowManager(int managerId)
        {
            // This may look like string interporlation, but
            // The interpolated value is converted to a DbParameter and isn't vulnerable to SQL injection
            // @see: https://docs.microsoft.com/en-us/ef/core/querying/raw-sql#code-try-2
            return await _schedulearnContext.Teams.FromSqlInterpolated(@$"WITH org AS (
                SELECT       
                    team.*,
                    usr.Id as UserId
                FROM       
                    dbo.Teams team
                    INNER JOIN dbo.Users usr
                        ON usr.TeamId = team.Id
                WHERE ManagerId = {managerId}
                UNION ALL
                SELECT 
                    e.*,
                    eUser.Id as UserId
                FROM 
                    dbo.Teams e
                    INNER JOIN org o 
                        ON o.UserId = e.ManagerId
                    INNER JOIN dbo.Users eUser
                        ON eUser.TeamId = e.Id
            ) SELECT DISTINCT org.Id, org.LimitId, org.ManagerId FROM org;").ToListAsync();
        }

        public async Task<List<TeamMembers>> GetManagedTeamsByTopicAsync(int topicId, int managerId)
        {
            var accessibleTeams = await GetAllTeamsBelowManager(managerId);
            var teamsByTopic = accessibleTeams
                .Select(t => new TeamMembers(t, GetTeamMembersWhoLearnedTopic(topicId, t)))
                .ToList();

            return teamsByTopic;
        }

        private List<User> GetTeamMembersWhoLearnedTopic(int topicId, Team team)
        {
            var membersWhoLearnedTopic = new List<User>();

            foreach (User memeber in team.Members)
            {
                var usersLearningDaysForTopic = memeber.LearningDays.Where(l => l.TopicId == topicId).ToList();
                if (usersLearningDaysForTopic.Count != 0)
                    membersWhoLearnedTopic.Add(memeber);
            }

            return membersWhoLearnedTopic;
        }
    }
}
