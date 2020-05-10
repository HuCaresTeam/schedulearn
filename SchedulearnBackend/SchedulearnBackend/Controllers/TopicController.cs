using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.Services;

namespace SchedulearnBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly TopicService _topicService;
        private readonly TeamService _teamService;
        private readonly SchedulearnContext _schedulearnContext;

        public TopicController(TopicService topicService, TeamService teamService, SchedulearnContext schedulearnContext)
        {
            _topicService = topicService;
            _teamService = teamService;
            _schedulearnContext = schedulearnContext;
        }

        // GET: api/Topic
        [HttpGet]
        public async Task<ActionResult<Topic>> GetRootTopic()
        {
            System.Diagnostics.Debug.WriteLine("GetRootTopic");
            return await _topicService.GetFullRootTopicAsync();
        }

        // GET: api/Topic/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetTopic {id}");
            return await _topicService.GetTopicAsync(id);
        }

        // GET: api/Topic/5/parent
        [HttpGet("{id}/parent")]
        public async Task<ActionResult<Topic>> GetParentTopic(int id)
        {
            System.Diagnostics.Debug.WriteLine($"GetParentTopic {id}");
            return await _topicService.GetParentTopicAsync(id);
        }

        // GET: api/Topic/manager/5
        [HttpGet("manager/{managerId}")]
        public async Task<ActionResult<IEnumerable<TeamTopics>>> GetTopicsForManagedTeams(int managerId)
        {
            System.Diagnostics.Debug.WriteLine("GetTopicsForManagedTeams " + managerId);
            return await _topicService.GetTopicsForManagedTeams(managerId);
        }

        // GET: api/Topic/team/5
        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<IEnumerable<TopicNoSubtopics>>> GetTopicsForTeam(int teamId)
        {
            System.Diagnostics.Debug.WriteLine("GetTopicsForTeam " + teamId);
            var topics = await _topicService.GetTopicsByTeamAsync(teamId);
            return topics
                .Select(t => new TopicNoSubtopics(t))
                .ToList();
        }

        // POST: api/Topic
        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic(CreateNewTopic topic)
        {
            System.Diagnostics.Debug.WriteLine($"PostTopic {topic.Name} with parent {topic.ParentTopicId}");
            var newTopic = await _topicService.CreateTopicAsync(topic);

            return CreatedAtAction(nameof(GetTopic), new { id = newTopic.Id }, newTopic);
        }

        // PUT: api/Topic/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Topic>> PutTopic(int id, ModifiedTopic modifiedTopic)
        {
            System.Diagnostics.Debug.WriteLine($"PutTopic {id}");
            return await _topicService.UpdateNameAndDescriptionAsync(id, modifiedTopic);
        }
    }
}
