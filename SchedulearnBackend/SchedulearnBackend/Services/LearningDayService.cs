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
    public class LearningDayService
    {
        private readonly SchedulearnContext _schedulearnContext;
        private readonly UserService _userService;

        public LearningDayService(UserService userService, SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
            _userService = userService;
        }

        public async Task<List<LearningDay>> GetAllLearningDaysAsync() 
        {
            return await _schedulearnContext.LearningDays.ToListAsync();
        }

        public async Task<LearningDay> GetLearningDayAsync(int id) 
        {
            var learningDay = await _schedulearnContext.LearningDays.FindAsync(id);
            return learningDay ?? throw new NotFoundException($"Learning day with id ({id}) does not exist");
        }

        public async Task<List<LearningDay>> GetLearningDaysByUserAsync(int userId)
        {
            return await _schedulearnContext.LearningDays
                .Where(l => l.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<LearningDay>> GetLearningDaysByTopicAsync(int topicId)
        {
            return await _schedulearnContext.LearningDays
                .Where(l => l.TopicId == topicId)
                .ToListAsync();
        }

        public async Task<List<LearningDay>> GetLearningDaysByTeamAsync(int teamId)
        {
            return await _schedulearnContext.LearningDays
                .Where(l => l.User.Team.Id == teamId)
                .ToListAsync();

        }

        public async Task<LearningDay> AddNewLearningDayAsync(CreateNewLearningDay learningDayToCreate) 
        {
            await _userService.GetUserAsync(learningDayToCreate.UserId); //Check user exists
            var topic = await _schedulearnContext.Topics.FindAsync(learningDayToCreate.TopicId);
            if (topic == null)
                throw new NotFoundException($"Topic with id ({learningDayToCreate.TopicId}) does not exist");

            var newLearningDay = learningDayToCreate.CreateLearningDay();

            await _schedulearnContext.LearningDays.AddAsync(newLearningDay);
            await _schedulearnContext.SaveChangesAsync();
            await _schedulearnContext.Entry(newLearningDay).ReloadAsync();

            return newLearningDay;
        }

        public async Task<LearningDay> ModifyLearningDayAsync(int id, ModifyLearningDay learningDayToCreate)
        {
            var learningDay = await _schedulearnContext.LearningDays.FindAsync(id);
            if (learningDay == null)
                throw new NotFoundException($"Learning day with id ({id}) does not exist.");

            learningDay.Description = learningDayToCreate.Description;
            _schedulearnContext.Update(learningDay);

            await _schedulearnContext.SaveChangesAsync();

            return learningDay;
        }
    }
}
