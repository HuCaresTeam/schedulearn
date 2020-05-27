using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class UserService
    {
        private readonly IConfiguration _configuration;
        private readonly SchedulearnContext _schedulearnContext;
        private readonly TeamService _teamService;
        private readonly LimitService _limitService;
        private readonly EmailService _emailService;

        public UserService(IConfiguration configuration, TeamService teamService, LimitService limitService, EmailService emailService, SchedulearnContext schedulearnContext)
        {
            _configuration = configuration;
            _schedulearnContext = schedulearnContext;
            _teamService = teamService;
            _limitService = limitService;
            _emailService = emailService;
        }

        public async Task<UserWithToken> Authenticate(string userEmail, string userPassword)
        {
            var user = await _schedulearnContext.Users.Where(u => u.Email == userEmail && u.Password == userPassword).FirstOrDefaultAsync();
            if (user == null)
                throw new UnauthorizedException($"Username or password is incorrect");

            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email)
                   };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var securityToken = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return new UserWithToken(user, token);
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

        public async Task<User> GetUnregisteredUsersByGuidAsync(Guid guid)
        {
            var user = await _schedulearnContext.Users
                .Where(u => u.RegistrationGuid == guid)
                .Where(u => u.Password == null)
                .FirstOrDefaultAsync();
            return user ?? throw new NotFoundException($"User with guid ({guid}) does not exist");
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

            Guid newUserGuid = Guid.NewGuid();
            newUser.RegistrationGuid = newUserGuid;

            var link = Regex.Replace(userData.RegisterAddress, "{GUID}", newUserGuid.ToString());

            await _emailService.SendRegistrationEmail(newUser.Email, newUser.Name, manager.Name, link);

            await _schedulearnContext.Users.AddAsync(newUser);
            await _schedulearnContext.SaveChangesAsync();

            return newUser;
        }

        public async Task<User> SetUserPassword(Guid userGuid, UserPassword userPassword)
        {
            var user = await GetUnregisteredUsersByGuidAsync(userGuid);

            user.Password = userPassword.Password;
            user.Name = userPassword.Name;
            user.Surname = userPassword.Surname;
            _schedulearnContext.Update(user);
            await _schedulearnContext.SaveChangesAsync();

            return user;
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

        public async Task<IEnumerable<User>> GetAllUsersBelowManager(int managerId)
        {
            var managedTeams = await _teamService.GetManagedTeams(managerId);
            var managedUsers = managedTeams.SelectMany((team) => team.Members);

            return managedUsers;
        }
    }
}
