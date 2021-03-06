﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<ActionResult<UserWithToken>> Authenticate(AuthenticateModel model)
        {
            return await _userService.Authenticate(model.Email, model.Password);
        }

        // GET: api/User/00000000-0000-0000-0000-000000000000/unregistered
        [AllowAnonymous]
        [HttpGet("{guid}/unregistered")]
        public async Task<ActionResult<UserWithGuid>> GetUserByGuid(Guid guid)
        {
            var user = await _userService.GetUnregisteredUsersByGuidAsync(guid);
            System.Diagnostics.Debug.WriteLine($"GetUserByGuid: {guid}");

            return new UserWithGuid(user, guid);
        }

        // GET: api/User/current
        [HttpGet("current")]
        public async Task<ActionResult<UserWithoutPassword>> GetCurrentUser()
        {
            var id = int.Parse(User.FindFirst("Id").Value);
            var currentUser = await _userService.GetUserAsync(id);

            System.Diagnostics.Debug.WriteLine($"Currently logged in user: {currentUser.Id} {currentUser.Email}");

            return new UserWithoutPassword(currentUser);
        }

        // GET: api/user/1/managed
        [HttpGet("{managerId}/managed")]
        public async Task<ActionResult<IEnumerable<UserWithoutPassword>>> GetUserManagedUsers(int managerId)
        {
            System.Diagnostics.Debug.WriteLine("GetUserManagedUsers");
            var users = await _userService.GetAllUsersBelowManager(managerId);

            return users
                .Select(user => new UserWithoutPassword(user))
                .ToList();
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWithoutPassword>>> GetUsers()
        {
            System.Diagnostics.Debug.WriteLine("GetUsers");

            var users = await _userService.AllUsersAsync();
            return users
                .Select(u => new UserWithoutPassword(u))
                .ToList();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWithoutPassword>> GetUser(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetUser " + id);
            var user = await _userService.GetUserAsync(id);

            return new UserWithoutPassword(user);
        }

        // PUT: api/User/00000000-0000-0000-0000-000000000000/register
        [AllowAnonymous]
        [HttpPut("{guid}/register")]
        public async Task<ActionResult<UserWithoutPassword>> PutUserPassword(Guid guid, UserPassword userPassword)
        {
            System.Diagnostics.Debug.WriteLine($"PutUserPassword: UserId: {guid}");
            var user = await _userService.SetUserPassword(guid, userPassword);
            return new UserWithoutPassword(user);
        }

        // PUT: api/User/5/limits
        [HttpPut("{id}/limits")]
        public async Task<ActionResult> PutUserLimits(int id, UserLimitsToApply limits)
        {
            System.Diagnostics.Debug.WriteLine($"PutUserLimits: UserId: {id}, LimitId: {limits.LimitId}");
            await _userService.ChangeLimitsForUserAsync(id, limits);
            return NoContent();
        }

        // PUT: api/User/5/transfer
        [HttpPut("{id}/transfer")]
        public async Task<ActionResult> TransferUserTeam(int id, TeamTransfer transfer)
        {
            System.Diagnostics.Debug.WriteLine($"TransferUserTeam: UserId: {id}, NewTeamId: {transfer.NewTeamId}");
            await _userService.TransferUserToNewTeamAsync(id, transfer);
            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserWithoutPassword>> PostUser(CreateNewUser userToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostUser: Name: {userToCreate.Name}, Surname {userToCreate.Surname}, ManagerId: {userToCreate.ManagingUserId}, TitleId: {userToCreate.JobTitleId}");
            var newUser = await _userService.AddNewUserAsync(userToCreate);

            var newUserWithoutPassword = new UserWithoutPassword(newUser);
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUserWithoutPassword);
        }

    }
}