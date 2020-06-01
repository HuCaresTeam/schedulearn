using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

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

            if (_schedulearnContext.Topics.Where(t => t.ParentTopicId == topicToCreate.ParentTopicId && t.Name == topicToCreate.Name).Any())
                throw new BadRequestException(Error_TopicWithThisNameExists);

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

        public async Task<List<TeamTopics>> GetTopicsByManager(int managerId)
        {
            var baseTeam = await _schedulearnContext.Teams.Where(t => t.ManagerId == managerId).SingleOrDefaultAsync();
            if (baseTeam == null)
                throw new NotFoundException($"User with id {managerId} doesn't have managed teams");

            var teamTopicTasks = new List<KeyValuePair<Team, Task<List<Topic>>>>();
            foreach (Team accessibleTeam in await _teamService.GetAllTeamsBelowManager(managerId))
            {
                var teamTopicsTask = GetTopicsByTeamAsync(accessibleTeam.Id);
                teamTopicTasks.Add(KeyValuePair.Create(accessibleTeam, teamTopicsTask));
            }

            await Task.WhenAll(teamTopicTasks.Select(t => t.Value));
            var teamTopics = teamTopicTasks.Select(async (teamTopics) => new TeamTopics(teamTopics.Key, await teamTopics.Value));

            return (await Task.WhenAll(teamTopics)).ToList();
        }
    }
}
