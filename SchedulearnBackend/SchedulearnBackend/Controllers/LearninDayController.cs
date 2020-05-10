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
    public class LearningDayController : ControllerBase
    {
        private readonly LearningDayService _learningDayService;

        public LearningDayController(LearningDayService learningDayService)
        {
            _learningDayService = learningDayService;
        }

        // GET: api/LearningDay
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningDayWithUser>>> GetAllLearningDays()
        {
            System.Diagnostics.Debug.WriteLine("GetAllLearningDays");
            var learningDays = await _learningDayService.GetAllLearningDaysAsync();

            return learningDays
                .Select(l => new LearningDayWithUser(l))
                .ToList();
        }

        // GET: api/LearningDay/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LearningDayWithUser>> GetLearningDay(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetLearningDay {id}");
            var learningDay = await _learningDayService.GetLearningDayAsync(id);
            return new LearningDayWithUser(learningDay);
        }


        // GET: api/LearningDay/User/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<LearningDayWithUser>>> GetLearningDaysByUserId(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetLearningDaysByUserId {id}");
            var learningDays = await _learningDayService.GetLearningDaysByUserAsync(id);

            return learningDays
                .Select(l => new LearningDayWithUser(l))
                .ToList();
        }

        // GET: api/LearningDay/Topic/5
        [HttpGet("topic/{id}")]
        public async Task<ActionResult<IEnumerable<LearningDayWithUser>>> GetLearningDaysByTopic(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetLearningDaysByTopic {id}");
            var learningDays = await _learningDayService.GetLearningDaysByTopicAsync(id);

            return learningDays
                .Select(l => new LearningDayWithUser(l))
                .ToList();
        }

        // POST: api/LearningDay
        [HttpPost]
        public async Task<ActionResult<LearningDayWithUser>> PostNewLearningDay(CreateNewLearningDay learningDayToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostNewLearningDay: User {learningDayToCreate.UserId} creating learning day for topic {learningDayToCreate.TopicId}");
            var newLearningDay = await _learningDayService.AddNewLearningDayAsync(learningDayToCreate);

            var learningDayWithUser = new LearningDayWithUser(newLearningDay);

            return CreatedAtAction(nameof(GetLearningDay), new { id = learningDayWithUser.Id }, learningDayWithUser);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<LearningDayWithUser>> PutLearningDay(int id, ModifyLearningDay learningDayToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PutLearningDay: {id}");
            var modifiedLearningDay = await _learningDayService.ModifyLearningDayAsync(id, learningDayToCreate);

            return new LearningDayWithUser(modifiedLearningDay);
        }
    }
}