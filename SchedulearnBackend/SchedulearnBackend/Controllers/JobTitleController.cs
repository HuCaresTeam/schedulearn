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
    public class JobTitleController : ControllerBase
    {
        private readonly UserContext _userContext;

        public JobTitleController(UserContext userContext)
        {
            _userContext = userContext;
        }

        // GET: api/JobTitle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobTitle>>> GetJobTitles()
        {
            System.Diagnostics.Debug.WriteLine("GetJobTitles");

            return await _userContext.JobTitles.ToListAsync();
        }

        // GET: api/JobTitle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobTitle>> GetJobTitle(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetJobTitle " + id);

            var jobTitle = await _userContext.JobTitles.FindAsync(id);

            if (jobTitle == null)
            {
                return NotFound();
            }

            return jobTitle;
        }

        // PUT: api/JobTitle/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobTitle(int id, JobTitle jobTitle)
        {
            System.Diagnostics.Debug.WriteLine("PutJobTitle " + id);

            if (id != jobTitle.Id)
            {
                return BadRequest();
            }

            _userContext.Entry(jobTitle).State = EntityState.Modified;

            try
            {
                await _userContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobTitleExists(id))
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

        // POST: api/JobTitle
        [HttpPost]
        public async Task<ActionResult<JobTitle>> PostJobTitle(JobTitle jobTitle)
        {
            System.Diagnostics.Debug.WriteLine("PostJobTitle " + jobTitle.Id + " " + jobTitle.Title);

            _userContext.JobTitles.Add(jobTitle);
            await _userContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJobTitle), new { id = jobTitle.Id }, jobTitle);
        }

        // DELETE: api/JobTitle/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobTitle>> DeleteJobTitle(int id)
        {
            System.Diagnostics.Debug.WriteLine("DeleteJobTitle " + id);

            var jobTitle = await _userContext.JobTitles.FindAsync(id);
            if (jobTitle == null)
            {
                return NotFound();
            }

            _userContext.JobTitles.Remove(jobTitle);
            await _userContext.SaveChangesAsync();

            return jobTitle;
        }

        private bool JobTitleExists(int id)
        {
            return _userContext.JobTitles.Any(e => e.Id == id);
        }
    }
}