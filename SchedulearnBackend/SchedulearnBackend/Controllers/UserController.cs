using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SchedulearnContext _schedulearnContext;

        public UserController(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            System.Diagnostics.Debug.WriteLine("GetUsers");

            return await _schedulearnContext.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetUser " + id);

            var user = await _schedulearnContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            System.Diagnostics.Debug.WriteLine("PutUser " + id);

            if (id != user.Id)
            {
                return BadRequest();
            }

            _schedulearnContext.Entry(user).State = EntityState.Modified;

            try
            {
                await _schedulearnContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            System.Diagnostics.Debug.WriteLine("PostUser " + user.Id + " " + user.Name);

            _schedulearnContext.Users.Add(user);
            await _schedulearnContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            System.Diagnostics.Debug.WriteLine("DeleteUser " + id);

            var user = await _schedulearnContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _schedulearnContext.Users.Remove(user);
            await _schedulearnContext.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _schedulearnContext.Users.Any(e => e.Id == id);
        }
    }
}