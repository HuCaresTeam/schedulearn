using SchedulearnBackend.Controllers.DTOs;
using SchedulearnBackend.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class AnalyzeDataService
    {
        private readonly SchedulearnContext _schedulearnContext;
        private readonly LearningDayService _learningDayService;

        public AnalyzeDataService(SchedulearnContext schedulearnContext, LearningDayService learningDayService)
        {
            _schedulearnContext = schedulearnContext;
            _learningDayService = learningDayService;
        }

        public async Task<List<WorkerByTopicEntry>> GetWorkersByTopic(int topicId)
        {
            var topics = await _learningDayService.GetLearningDaysByTopicAsync(topicId);
            return topics.Select(l => new WorkerByTopicEntry(l)).ToList();
        }
    }
}
