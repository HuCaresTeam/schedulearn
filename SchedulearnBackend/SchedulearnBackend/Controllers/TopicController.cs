using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly UserContext _userContext;

        public TopicController(UserContext userContext)
        {
            _userContext = userContext;
        }

        // GET: api/Topic
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            System.Diagnostics.Debug.WriteLine("GetTopics");

            return await _userContext.Topics.ToListAsync();
        }

        // GET: api/Topic/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetTopic " + id);


            var topic = await _userContext.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            return topic;
        }

        // PUT: api/Topic/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopic(int id, Topic topic)
        {
            System.Diagnostics.Debug.WriteLine("PutTopic " + id);

            if (id != topic.Id)
            {
                return BadRequest();
            }

            _userContext.Entry(topic).State = EntityState.Modified;

            try
            {
                await _userContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
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

        // POST: api/Topic
        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic(Topic topic)
        {
            System.Diagnostics.Debug.WriteLine("PostTopic " + topic.Id + " " + topic.Name);

            _userContext.Topics.Add(topic);
            await _userContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTopic), new { id = topic.Id }, topic);
        }

        // DELETE: api/Topic/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Topic>> DeleteTopic(int id)
        {
            System.Diagnostics.Debug.WriteLine("DeleteTopic " + id);

            var topic = await _userContext.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _userContext.Topics.Remove(topic);
            await _userContext.SaveChangesAsync();

            return topic;
        }

        private bool TopicExists(int id)
        {
            return _userContext.Topics.Any(e => e.Id == id);
        }
    }

}
