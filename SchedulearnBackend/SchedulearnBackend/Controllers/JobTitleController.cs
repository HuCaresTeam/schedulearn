using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs.NewJobTitle;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitleController : ControllerBase
    {
        private readonly SchedulearnContext _schedulearnContext;

        public JobTitleController(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        // GET: api/JobTitle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobTitle>>> GetJobTitles()
        {
            System.Diagnostics.Debug.WriteLine("GetJobTitles");

            return await _schedulearnContext.JobTitles.ToListAsync();
        }

        // GET: api/JobTitle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobTitle>> GetJobTitle(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetJobTitle " + id);

            var jobTitle = await _schedulearnContext.JobTitles.FindAsync(id);

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

            _schedulearnContext.Entry(jobTitle).State = EntityState.Modified;

            try
            {
                await _schedulearnContext.SaveChangesAsync();
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
        public async Task<ActionResult<JobTitle>> PostJobTitle(CreateJobTitle jobTitle)
        {
            System.Diagnostics.Debug.WriteLine("PostJobTitle " + jobTitle.Title);

            JobTitle newTitle = new JobTitle() { Title = jobTitle.Title };

            _schedulearnContext.JobTitles.Add(newTitle);
            await _schedulearnContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJobTitle), new { id = newTitle.Id }, newTitle);
        }

        // DELETE: api/JobTitle/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobTitle>> DeleteJobTitle(int id)
        {
            System.Diagnostics.Debug.WriteLine("DeleteJobTitle " + id);

            var jobTitle = await _schedulearnContext.JobTitles.FindAsync(id);
            if (jobTitle == null)
            {
                return NotFound();
            }

            _schedulearnContext.JobTitles.Remove(jobTitle);
            await _schedulearnContext.SaveChangesAsync();

            return jobTitle;
        }

        private bool JobTitleExists(int id)
        {
            return _schedulearnContext.JobTitles.Any(e => e.Id == id);
        }
    }
}