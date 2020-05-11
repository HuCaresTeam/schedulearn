using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Extensions;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

namespace SchedulearnBackend.Services
{
    public class SuggestionService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public SuggestionService (SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public async Task<List<Suggestion>> GetAllSuggestionsAsync() 
        {
            return await _schedulearnContext.Suggestions.ToListAsync();
        }

        public async Task<Suggestion> GetSuggestionAsync(int id) 
        {
            var suggestion = await _schedulearnContext.Suggestions.FindAsync(id);
            return suggestion ?? throw new NotFoundException($"Suggestion with id ({id}) does not exist");
        }

        public async Task<List<Suggestion>> GetSuggestionsForSuggesteeAsync(int userId)
        {
            return await _schedulearnContext.Suggestions
                .Where(l => l.SuggesteeId == userId)
                .ToListAsync();
        }

    }
}
