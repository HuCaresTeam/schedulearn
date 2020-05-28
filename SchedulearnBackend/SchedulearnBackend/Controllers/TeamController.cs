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

        public TeamController(TeamService teamService)
        {
            _teamService = teamService;
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
        public async Task<ActionResult<IEnumerable<FlatTeam>>> GetAccessibleTeams(int id)
        {
            System.Diagnostics.Debug.WriteLine("GetAccessibleTeams " + id);
            var teams = await _teamService.GetAllTeamsBelowTeam(id);
            return teams
                .Select(t => new FlatTeam(t))
                .ToList();
        }

        // GET: api/Team/manager/5/accessible
        [HttpGet("manager/{managerId}/accessible")]
        public async Task<ActionResult<IEnumerable<FlatTeam>>> GetManagedTeams(int managerId)
        {
            System.Diagnostics.Debug.WriteLine("GetManagedTeams " + managerId);
            var teams = await _teamService.GetAllTeamsBelowManager(managerId);
            return teams
                .Select(t => new FlatTeam(t))
                .ToList();
        }

        // GET: api/Team/manager/5/topic/4
        [HttpGet("manager/{managerId}/topic/{topicId}")]
        public async Task<ActionResult<IEnumerable<TeamMembers>>> GetManagedTeamsByTopic(int managerId, int topicId)
        {
            System.Diagnostics.Debug.WriteLine($"GetManagedTeamsByTopic: ManagerId: {managerId}, TopicId: {topicId}");
            return await _teamService.GetManagedTeamsByTopicAsync(topicId, managerId);
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
