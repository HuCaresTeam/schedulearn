using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class UserService
    {
        private readonly SchedulearnContext _schedulearnContext;
        private readonly TeamService _teamService;
        private readonly LimitService _limitService;

        public UserService(TeamService teamService, LimitService limitService, SchedulearnContext schedulearnContext) 
        {
            _schedulearnContext = schedulearnContext;
            _teamService = teamService;
            _limitService = limitService;
        }

        public async Task<List<User>> AllUsersAsync() 
        {
            return await _schedulearnContext.Users.ToListAsync();
        }

        public async Task<User> GetUserAsync(int id) 
        {
            var user = await _schedulearnContext.Users.FindAsync(id);
            return user ?? throw new NotFoundException($"User with id ({id}) does not exist");
        }

        public async Task<User> AddNewUserAsync (CreateNewUser userData) 
        {
            var manager = await GetUserAsync(userData.ManagingUserId);
            if (manager == null)
                throw new NotFoundException($"Manager with id ({userData.ManagingUserId}) does not exist");

            User newUser = userData.CreateUser();
            if (manager.ManagedTeam == null)
            {
                var newTeam = await _teamService.AddNewTeamAsync(manager.Id, manager.Team.LimitId);
                newUser.TeamId = newTeam.Id;
            }
            else
            {
                newUser.TeamId = manager.ManagedTeam.Id;
            }

            await _schedulearnContext.Users.AddAsync(newUser);
            await _schedulearnContext.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> ChangeLimitsForUserAsync(LimitsToApply limits) 
        {
            var limit = await _limitService.GetLimitAsync(limits.LimitId);
            var user = await GetUserAsync(limits.UserId);

            user.LimitId = limit.Id;
            _schedulearnContext.Update(user);
            await _schedulearnContext.SaveChangesAsync();

            return user;
        }
    }
}
