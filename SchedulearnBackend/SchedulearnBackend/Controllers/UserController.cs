using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.Models;
using SchedulearnBackend.Services;

namespace SchedulearnBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // POST: api/User/authenticate
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<string>> Authenticate(AuthenticateModel model)
        {
            return await _userService.Authenticate(model.Email, model.Password);
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            System.Diagnostics.Debug.WriteLine("GetUsers");
            System.Diagnostics.Debug.WriteLine($"Currently logged in user: {User.FindFirst("Id").Value} {User.FindFirst("Name").Value} {User.FindFirst("Surname").Value} {User.FindFirst("Email").Value}");
            return await _userService.AllUsersAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetUser " + id);
            return await _userService.GetUserAsync(id);
        }

        // PUT: api/User/5/limits
        [HttpPut("{id}/limits")]
        public async Task<ActionResult<User>> PutUserLimits(int id, LimitsToApply limits)
        {
            System.Diagnostics.Debug.WriteLine($"PutUserLimits: UserId: {id}, LimitId: {limits.LimitId}");
            await _userService.ChangeLimitsForUserAsync(id, limits);
            return NoContent();
        }

        // PUT: api/User/5/transfer
        [HttpPut("{id}/transfer")]
        public async Task<ActionResult<User>> TransferUserTeam(int id, TeamTransfer transfer)
        {
            System.Diagnostics.Debug.WriteLine($"TransferUserTeam: UserId: {id}, NewTeamId: {transfer.NewTeamId}");
            await _userService.TransferUserToNewTeamAsync(id, transfer);
            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(CreateNewUser userToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostUser: Name: {userToCreate.Name}, Surname {userToCreate.Surname}, ManagerId: {userToCreate.ManagingUserId}");
            var newUser = await _userService.AddNewUserAsync(userToCreate);

            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }
    }
}