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

        public async Task<Suggestion> AddNewSuggestionAsync(CreateNewSuggestion suggestionToCreate)
        {
            var topic = await _schedulearnContext.Topics.FindAsync(suggestionToCreate.TopicId);
            var suggester = await _schedulearnContext.Users.FindAsync(suggestionToCreate.SuggesterId);
            var suggestee = await _schedulearnContext.Users.FindAsync(suggestionToCreate.SuggesteeId);

            if (topic == null)
                throw new NotFoundException(Error_TopicNotFound.ReplaceArgs(suggestionToCreate.TopicId));
            if (suggester == null)
                throw new NotFoundException(Error_UserNotFound.ReplaceArgs(suggestionToCreate.SuggesterId));
            if (suggestee == null)
                throw new NotFoundException(Error_UserNotFound.ReplaceArgs(suggestionToCreate.SuggesteeId));

            var newSuggestion = suggestionToCreate.CreateSuggestion();

            await _schedulearnContext.Suggestions.AddAsync(newSuggestion);
            await _schedulearnContext.SaveChangesAsync();
            await _schedulearnContext.Entry(newSuggestion).ReloadAsync();

            return newSuggestion;
        }
    }
}
