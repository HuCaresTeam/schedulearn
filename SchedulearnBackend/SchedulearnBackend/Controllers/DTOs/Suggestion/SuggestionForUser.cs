using System;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.Controllers.DTOs
{
    public class SuggestionForUser
    {
        public int TopicId { get; set; }
        public string TopicName { get; set; }

        public int SuggesterId { get; set; }
        public string SuggesterName { get; set; }
        public string SuggesterSurname { get; set; }

        public DateTime CreatedDate { get; set; }

        public SuggestionForUser(Suggestion suggestion)
        {
            TopicId = suggestion.Topic.Id;
            TopicName = suggestion.Topic.Name;

            SuggesterId = suggestion.Suggester.Id;
            SuggesterName = suggestion.Suggester.Name;
            SuggesterSurname = suggestion.Suggester.Surname;

            CreatedDate = suggestion.CreationDate;
        }
    }
}
