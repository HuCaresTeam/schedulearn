﻿using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class LimitService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public LimitService(SchedulearnContext schedulearnContext) 
        {
            _schedulearnContext = schedulearnContext;
        }

        public async Task<List<Limit>> AllLimitsAsync()
        {
            return await _schedulearnContext.Limits.ToListAsync();
        }

        public async Task<Limit> GetLimitAsync(int id) 
        {
            var limit = await _schedulearnContext.Limits.FindAsync(id);
            return limit ?? throw new NotFoundException($"Limit with id ({id}) not found");
        }
        public async Task<Limit> GetLimitByUserAsync(int userId)
        {
            var user = await _schedulearnContext.Users.FindAsync(userId);
            var limit = UserService.GetUserLimits(user);
            
            return limit ?? throw new NotFoundException($"Limit in user with id ({userId}) was not found");
        }

        public async Task<Limit> AddNewLimitAsync(LimitToCreate limitData)
        {
            Limit newLimit = limitData.CreateLimit();

            await _schedulearnContext.Limits.AddAsync(newLimit);
            await _schedulearnContext.SaveChangesAsync();

            return newLimit;
        }
    }
}
