using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class TopicService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public TopicService(SchedulearnContext schedulearnContext) 
        {
            _schedulearnContext = schedulearnContext;
        }

        public async Task<Topic> GetFullRootTopicAsync() 
        {
            var rootTopic = await _schedulearnContext.Topics
                .Where(t => t.ParentTopicId == null)
                .SingleOrDefaultAsync();

            if (rootTopic == null)
                throw new NotFoundException("Root topic does not exist");

            return rootTopic ?? throw new NotFoundException("Root topic does not exist");
        }

        public async Task<Topic> GetTopicAsync(int id)
        {
            var topic = await _schedulearnContext.Topics.FindAsync(id);
            if (topic == null)
                throw new NotFoundException($"Topic with id ({id}) does not exist");

            return topic;
        }

        public async Task<Topic> GetParentTopicAsync(int id)
        {
            var topic = await _schedulearnContext.Topics.FindAsync(id);
            if (topic == null)
                throw new NotFoundException($"Topic with id ({id}) does not exist");

            if (topic.ParentTopic == null)
                throw new NotFoundException("Parent topic does not exist on root topic");

            return topic.ParentTopic;
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
    }
}
