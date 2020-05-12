using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulearnBackend.Controllers.DTOs;
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
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<SuggestionForUser>>> GetSuggestionsForSuggestee(int userId)
        {
            var suggestions = await _suggestionService.GetSuggestionsForSuggesteeAsync(userId);
            return suggestions.Select(s => new SuggestionForUser(s)).ToList();
        }

        // POST: api/Suggestion/
        // TODO: Check if the Suggester can suggest a topic to the Suggestee
        // TODO: Check if the Suggester is the sending user. Can I get the user from authentication?
        [HttpPost]
        public async Task<ActionResult<List<SuggestionForUser>>> PostSuggestion(CreateNewSuggestion suggestionToCreate)
        {
            System.Diagnostics.Debug.WriteLine($"PostSuggestion: User {suggestionToCreate.SuggesterId} creating suggestion for user {suggestionToCreate.SuggesteeId} for topic: {suggestionToCreate.TopicId}");

            var newSuggestion = await _suggestionService.AddNewSuggestionAsync(suggestionToCreate);

            return NoContent();
        }

    }
}