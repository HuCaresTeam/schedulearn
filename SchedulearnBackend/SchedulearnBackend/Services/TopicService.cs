using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class TopicService
    {
        private readonly SchedulearnContext _schedulearnContext;
        private readonly LearningDayService _learningDayService;
        private readonly TeamService _teamService;

        public TopicService(LearningDayService learningDayService, TeamService teamService, SchedulearnContext schedulearnContext) 
        {
            _schedulearnContext = schedulearnContext;
            _learningDayService = learningDayService;
            _teamService = teamService;
        }

        public async Task<Topic> GetFullRootTopicAsync() 
        {
            var rootTopic = await _schedulearnContext.Topics
                .SingleOrDefaultAsync(t => t.ParentTopicId == null);

            return rootTopic ?? throw new NotFoundException("Root topic does not exist");
        }

        public async Task<Topic> GetTopicAsync(int id)
        {
            var topic = await _schedulearnContext.Topics.FindAsync(id);
            return topic ?? throw new NotFoundException($"Topic with id ({id}) does not exist"); ;
        }

        public async Task<Topic> GetParentTopicAsync(int id)
        {
            var topic = await _schedulearnContext.Topics.FindAsync(id);
            if (topic == null)
                throw new NotFoundException($"Topic with id ({id}) does not exist");

            return topic.ParentTopic ?? throw new NotFoundException("Parent topic does not exist on root topic"); ;
        }

        public async Task<Topic> UpdateNameAndDescriptionAsync(int id, ModifiedTopic modifiedTopic) 
        {
            var topic = await GetTopicAsync(id);

            topic.Name = modifiedTopic.Name ?? topic.Name;
            topic.Description = modifiedTopic.Description ?? modifiedTopic.Description;

            _schedulearnContext.Update(topic);
            await _schedulearnContext.SaveChangesAsync();

            return topic;
        }

        public async Task<Topic> CreateTopicAsync(CreateNewTopic topicToCreate)
        {
            var parentTopic = await GetTopicAsync(topicToCreate.ParentTopicId);
            if (parentTopic == null)
                throw new NotFoundException($"Parent topic with id ({topicToCreate.ParentTopicId}) does not exist");

            var newTopic = topicToCreate.CreateTopic();

            await _schedulearnContext.Topics.AddAsync(newTopic);
            await _schedulearnContext.SaveChangesAsync();

            return newTopic;
        }

        public async Task<List<Topic>> GetTopicsByTeamAsync(int teamId)
        {
            var teamLearningDays = await _learningDayService.GetLearningDaysByTeamAsync(teamId);
            var teamTopics = teamLearningDays.Select(l => l.Topic).Distinct().ToList();
            return teamTopics;
        }

        public async Task<List<TeamTopics>> GetTopicsForAccessibleTeams(int baseTeamId)
        {
            var teamsWithTopics = new List<TeamTopics>();

            var baseTeam = await _teamService.GetTeamAsync(baseTeamId);
            var baseTeamsTopics = await GetTopicsByTeamAsync(baseTeamId);
            teamsWithTopics.Add(new TeamTopics(baseTeam, baseTeamsTopics));

            foreach (Team accessibleTeam in await _teamService.GetAccessibleTeams(baseTeamId))
            {
                var teamTopics = await GetTopicsByTeamAsync(accessibleTeam.Id);
                teamsWithTopics.Add(new TeamTopics(accessibleTeam, teamTopics));
            }

            return teamsWithTopics;
        }
    }
}
