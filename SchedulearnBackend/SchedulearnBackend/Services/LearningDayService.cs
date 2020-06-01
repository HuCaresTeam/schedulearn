using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Extensions;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

namespace SchedulearnBackend.Services
{
    public enum LimitDirection
    {
        Forward = 1,
        Backward = -1
    }

    public class LearningDayService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public LearningDayService(SchedulearnContext schedulearnContext)
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
            return learningDay ?? throw new NotFoundException(Error_LearningDayNotFound);
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

            CheckLimits(user, learningDayToCreate.DateFrom, learningDayToCreate.TimezoneMinutes);

            var newLearningDay = learningDayToCreate.CreateLearningDay();

            await _schedulearnContext.LearningDays.AddAsync(newLearningDay);
            await _schedulearnContext.SaveChangesAsync();
            await _schedulearnContext.Entry(newLearningDay).ReloadAsync();

            return newLearningDay;
        }

        private void CheckLimits(User user, DateTime dateTimeFrom, int timeZoneMinutes)
        {
            //Localize timezone
            dateTimeFrom = dateTimeFrom.AddMinutes(timeZoneMinutes);

            CheckConsecutiveDaysLimit(user, dateTimeFrom, LimitDirection.Backward, timeZoneMinutes);
            CheckConsecutiveDaysLimit(user, dateTimeFrom, LimitDirection.Forward, timeZoneMinutes);
            CheckMonthLimit(user, dateTimeFrom, timeZoneMinutes);
            CheckQuarterLimit(user, dateTimeFrom, timeZoneMinutes);
            CheckYearLimit(user, dateTimeFrom, timeZoneMinutes);
        }

        private void CheckConsecutiveDaysLimit(User user, DateTime dateTimeFrom, LimitDirection direction, int timeZoneMinutes)
        {
            var dateFrom = dateTimeFrom.Date;
            var limit = UserService.GetUserLimits(user).LimitOfConsecutiveLearningDays;

            var consecutiveDays = Enumerable.Range(1, limit)
                .Select(offset => dateFrom.AddDays((int)direction * offset))
                .ToArray();

            var previousLearningDays = _schedulearnContext.LearningDays
                .Where(l => l.UserId == user.Id)
                .Where(l => consecutiveDays.Contains(l.DateFrom.AddMinutes(timeZoneMinutes).Date))
                .Select(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date)
                .Distinct()
                .ToList();

            if (previousLearningDays.Count >= limit)
                throw new LimitUsed(Error_LimitOfConsecutiveLearningDays);
        }

        private void CheckMonthLimit(User user, DateTime dateTimeFrom, int timeZoneMinutes)
        {
            var limit = UserService.GetUserLimits(user).LimitOfLearningDaysPerMonth;
            var previousLearningDays = _schedulearnContext.LearningDays
                .Where(l => l.UserId == user.Id)
                .Where(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date.Year == dateTimeFrom.Date.Year)
                .Where(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date.Month == dateTimeFrom.Date.Month)
                .Select(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date)
                .Distinct()
                .ToList();

            if (previousLearningDays.Count >= limit)
                throw new LimitUsed(Error_LimitOfLearningDaysPerMonth);
        }

        private void CheckQuarterLimit(User user, DateTime dateTimeFrom, int timeZoneMinutes)
        {
            var currentDateFrom = dateTimeFrom.Date;
            int quarter = ((currentDateFrom.Month + 2) / 3);

            var dateFrom = new DateTime(currentDateFrom.Year, ((quarter - 1) * 3) + 1, 1);
            var dateTo = dateFrom.AddMonths(3).AddDays(-1);

            var limit = UserService.GetUserLimits(user).LimitOfLearningDaysPerQuarter;
            var previousLearningDays = _schedulearnContext.LearningDays
                .Where(l => l.UserId == user.Id)
                .Where(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date >= dateFrom && l.DateTo.AddMinutes(timeZoneMinutes).Date <= dateTo)
                .Select(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date)
                .Distinct()
                .ToList();

            if (previousLearningDays.Count >= limit)
                throw new LimitUsed(Error_LimitOfLearningDaysPerQuarter);
        }

        private void CheckYearLimit(User user, DateTime dateTimeFrom, int timeZoneMinutes)
        {
            var limit = UserService.GetUserLimits(user).LimitOfLearningDaysPerYear;
            var previousLearningDays = _schedulearnContext.LearningDays
                .Where(l => l.UserId == user.Id)
                .Where(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date.Year == dateTimeFrom.Date.Year)
                .Select(l => l.DateFrom.AddMinutes(timeZoneMinutes).Date)
                .Distinct()
                .ToList();

            if (previousLearningDays.Count >= limit)
                throw new LimitUsed(Error_LimitOfLearningDaysPerYear);
        }

        public async Task<LearningDay> ModifyLearningDayAsync(int id, ModifyLearningDay learningDayToModify)
        {
            var learningDay = await GetLearningDayAsync(id);

            if (!learningDayToModify.ForceWrite ?? true)
                _schedulearnContext.Entry(learningDay).Property("RowVersion").OriginalValue = learningDayToModify.RowVersion;

            learningDay.Description = learningDayToModify.Description;

            _schedulearnContext.Update(learningDay);
            await _schedulearnContext.SaveChangesAsync();

            return learningDay;
        }

        public async Task DeleteLearningDay(int id)
        {
            var dayToDelete = await GetLearningDayAsync(id);

            _schedulearnContext.LearningDays.Remove(dayToDelete);
            await _schedulearnContext.SaveChangesAsync();
        }
    }
}
