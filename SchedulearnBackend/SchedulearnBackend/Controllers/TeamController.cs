using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.Services;

namespace SchedulearnBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly TeamService _teamService;
        private readonly TopicService _topicService;

        public TeamController(TeamService teamService, TopicService topicService)
        {
            _teamService = teamService;
            _topicService = topicService;
        }

        // GET: api/Team
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            System.Diagnostics.Debug.WriteLine("GetTeams");
            return await _teamService.AllTeamsAsync();
        }

        // GET: api/Team/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetTeam " + id);
            return await _teamService.GetTeamAsync(id);
        }

        // GET: api/Team/5/accessible
        [HttpGet("{id}/accessible")]
        public async Task<ActionResult<IEnumerable<Team>>> GetAccessibleTeams(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetAccessibleTeams " + id);
            return await _teamService.GetAccessibleTeams(id);
        }

        // GET: api/Team/5/topics
        [HttpGet("{id}/topics")]
        public async Task<ActionResult<IEnumerable<TeamTopics>>> GetTopicsByTeam(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetTopicsByTeam " + id);
            return await _topicService.GetTopicsForAccessibleTeams(id);
        }

        // PUT: api/Team/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamLimits(int id, LimitsToApply limits)
        {
            System.Diagnostics.Debug.WriteLine($"PutTeamLimits: TeamId: {id}, LimitId: {limits.LimitId}");
            await _teamService.ChangeLimitsForTeamAsync(id, limits);
            return NoContent();
        }

        // POST: api/Team
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(CreateNewTeam teamToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostTeam: ManagerId: {teamToCreate.ManagerId}, LimitId: {teamToCreate.LimitId}");
            var newTeam = await _teamService.AddNewTeamAsync(teamToCreate);
            return CreatedAtAction(nameof(GetTeam), new { id = newTeam.Id }, newTeam);
        }
    }
}
