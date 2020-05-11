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
    public class SuggestionController : ControllerBase
    {
        private readonly SuggestionService _suggestionService;

        public SuggestionController(SuggestionService suggestionService)
        {
            _suggestionService = suggestionService;
        }

        // GET: api/Suggestion/user/{id}
        [HttpGet("user/{id}")]
        public async Task<ActionResult<List<SuggestionForUser>>> GetSuggestionsForSuggestee(int userId)
        {
            var suggestions = await _suggestionService.GetSuggestionsForSuggesteeAsync(userId);
            return suggestions.Select(s => new SuggestionForUser(s)).ToList(); ;
        }

    }
}