using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.Services;

namespace SchedulearnBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly TopicService _topicService;
        private readonly SchedulearnContext _schedulearnContext;

        public TopicController(TopicService topicService, SchedulearnContext schedulearnContext)
        {
            _topicService = topicService;
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
