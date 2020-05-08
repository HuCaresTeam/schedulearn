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
        private readonly LearningDayService _learningDayService;

        public TeamService(LimitService limitService, LearningDayService learningDayService, SchedulearnContext schedulearnContext)
        {
            _limitService = limitService;
            _learningDayService = learningDayService;
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

        public async Task<List<Team>> GetAccessibleTeams(int teamId)
        {
            var accessibleTeams = new List<Team>();
            var team = await GetTeamAsync(teamId);

            foreach (User member in team.Members)
            {
                if (member.ManagedTeam != null)
                {
                    accessibleTeams.Add(member.ManagedTeam);
                    accessibleTeams.AddRange(await GetAccessibleTeams(member.ManagedTeam.Id));
                }
            }

            return accessibleTeams;
        }

        public async Task<List<TeamMembers>> GetTeamsByTopicAsync(int topicId, int baseTeamId)
        {
            var teamsByTopic = new List<TeamMembers>();

            var baseTeam = await GetTeamAsync(baseTeamId);
            var baseMemebersWhoLearnedTopic = await GetTeamMembersWhoLearnedTopic(topicId, baseTeam);
            if (baseMemebersWhoLearnedTopic.Count != 0)
                teamsByTopic.Add(new TeamMembers(baseTeam, baseMemebersWhoLearnedTopic));

            foreach (Team accessibleTeam in await GetAccessibleTeams(baseTeamId))
            {
                var memebersWhoLearnedTopic = await GetTeamMembersWhoLearnedTopic(topicId, accessibleTeam);
                if (memebersWhoLearnedTopic.Count != 0)
                    teamsByTopic.Add(new TeamMembers(accessibleTeam, memebersWhoLearnedTopic));
            }

            return teamsByTopic;
        }

        private async Task<List<User>> GetTeamMembersWhoLearnedTopic(int topicId, Team team)
        {
            var membersWhoLearnedTopic = new List<User>();

            foreach (User memeber in team.Members)
            {
                var usersLearningDaysForTopic = await _learningDayService.GetLearningDaysByUserAndTopicAsync(memeber.Id, topicId);
                if (usersLearningDaysForTopic.Count != 0)
                    membersWhoLearnedTopic.Add(memeber);
            }

            return membersWhoLearnedTopic;
        }
    }
}
