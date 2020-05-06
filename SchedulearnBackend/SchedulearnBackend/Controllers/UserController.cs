using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.Models;
using SchedulearnBackend.Services;

namespace SchedulearnBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            System.Diagnostics.Debug.WriteLine("GetUsers");
            return await _userService.AllUsersAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetUser " + id);
            return await _userService.GetUserAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult<User>> PutUser(LimitsToApply limits) {
            await _userService.ChangeLimitsForUserAsync(limits);
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