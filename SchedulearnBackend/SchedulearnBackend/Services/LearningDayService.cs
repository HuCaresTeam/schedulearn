using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Extensions;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

namespace SchedulearnBackend.Services
{
    public class LearningDayService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public LearningDayService (SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
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

        public async Task<List<LearningDay>> GetLearningDaysByTopicAndManagerAsync(int topicId, int managerId)
        {
            return await _schedulearnContext.LearningDays
                .Where(l => l.TopicId == topicId)
                .Where(l => l.User.Team.ManagerId == managerId)
                .ToListAsync();
        }

        public async Task<List<LearningDay>> GetLearningDaysByTeamAsync(int teamId)
        {
            return await _schedulearnContext.LearningDays
                .Where(l => l.User.TeamId == teamId)
                .ToListAsync();
        }

        public async Task<LearningDay> AddNewLearningDayAsync(CreateNewLearningDay learningDayToCreate) 
        {
            var user = await _schedulearnContext.Users.FindAsync(learningDayToCreate.UserId);
            if (user == null)
                throw new NotFoundException(Error_UserNotFound.ReplaceArgs(learningDayToCreate.UserId));

            var topic = await _schedulearnContext.Topics.FindAsync(learningDayToCreate.TopicId);
            if (topic == null)
                throw new NotFoundException(Error_TopicNotFound.ReplaceArgs(learningDayToCreate.TopicId));

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
                throw new NotFoundException(Error_LearningDayNotFound.ReplaceArgs(id));

            learningDay.Description = learningDayToCreate.Description;
            _schedulearnContext.Update(learningDay);

            await _schedulearnContext.SaveChangesAsync();

            return learningDay;
        }
    }
}
