using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class UserService
    {
        private readonly IConfiguration _configuration;
        private readonly SchedulearnContext _schedulearnContext;
        private readonly TeamService _teamService;
        private readonly LimitService _limitService;

        public UserService(IConfiguration configuration, TeamService teamService, LimitService limitService, SchedulearnContext schedulearnContext)
        {
            _configuration = configuration;
            _schedulearnContext = schedulearnContext;
            _teamService = teamService;
            _limitService = limitService;
        }

        public async Task<string> Authenticate(string userEmail, string userPassword)
        {
            var user = await _schedulearnContext.Users.Where(u => u.Email == userEmail && u.Password == userPassword).FirstOrDefaultAsync();
            if (user != null)
            {
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Name", user.Name),
                    new Claim("Surname", user.Surname),
                    new Claim("Email", user.Email)
                   };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            throw new UnauthorisedException($"Username or password is incorrect");
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

        public async Task<User> AddNewUserAsync(CreateNewUser userData)
        {
            var manager = await GetUserAsync(userData.ManagingUserId);
            if (manager == null)
                throw new NotFoundException($"Manager with id ({userData.ManagingUserId}) does not exist");

            User newUser = userData.CreateUser();
            if (manager.ManagedTeam == null)
            {
                var newTeam = await _teamService.AddNewTeamAsync(new CreateNewTeam() { ManagerId = manager.Id, LimitId = manager.Team.LimitId });
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

        public async Task<User> ChangeLimitsForUserAsync(int userId, LimitsToApply limits)
        {
            var limit = await _limitService.GetLimitAsync(limits.LimitId);
            var user = await GetUserAsync(userId);

            user.LimitId = limit.Id;
            _schedulearnContext.Update(user);
            await _schedulearnContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> TransferUserToNewTeamAsync(int userId, TeamTransfer transfer)
        {
            var user = await GetUserAsync(userId);
            var team = await _teamService.GetTeamAsync(transfer.NewTeamId);

            user.TeamId = team.Id;
            _schedulearnContext.Update(user);
            await _schedulearnContext.SaveChangesAsync();

            return user;
        }
    }
}
