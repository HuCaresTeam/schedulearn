using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace SchedulearnBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LimitController : ControllerBase
    {
        private readonly LimitService _limitService;
        private readonly SchedulearnContext _schedulearnContext;

        public LimitController(LimitService limitService, SchedulearnContext schedulearnContext)
        {
            _limitService = limitService;
            _schedulearnContext = schedulearnContext;
        }

        // GET: api/Limit
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Limit>>> GetLimits()
        {
            System.Diagnostics.Debug.WriteLine("GetLimits");

            return await _schedulearnContext.Limits.ToListAsync();
        }
        


        // GET: api/Limit/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Limit>> GetLimit(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetLimit {id}");
            return await _limitService.GetLimitAsync(id);
        }
        // GET: api/Limit/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<Limit>> GetLimitByUser(int userId)
        {
            System.Diagnostics.Debug.WriteLine($"GetLimitByUser {userId}");
            return await _limitService.GetLimitByUserAsync(userId);
        }

        //POST: api/Limit
        [HttpPost]
        public async Task<ActionResult<Limit>> PostLimit(LimitToCreate limitToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostLimit: Name: {limitToCreate.Name}, Consecutive Learning Days: {limitToCreate.LimitOfConsecutiveLearningDays}, Learning Days Per Month: {limitToCreate.LimitOfLearningDaysPerMonth}, Learning Days Per Quarter: {limitToCreate.LimitOfLearningDaysPerQuarter}, Learning Days Per Year: {limitToCreate.LimitOfLearningDaysPerYear}");
            var newLimit = await _limitService.AddNewLimitAsync(limitToCreate);

            return CreatedAtAction(nameof(GetLimit), new { id = newLimit.Id }, newLimit);
        }

    }
}
