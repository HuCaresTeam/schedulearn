﻿using DotNetify;
using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.BaseVMs
{
    public class AnalyzeDataVM : BaseVM
    {
        public class TopicIdWorker
        {
            public int TopicId { get; set; }
        }
        public class WorkerByTopicEntry
        {
            public WorkerByTopicEntry(LearningDay learningDay)
            {
                UserId = learningDay.User.Id;
                TopicId = learningDay.Topic.Id;
                FullName = learningDay.User.Name + " " + learningDay.User.Surname;
                JobTitle = learningDay.User.JobTitle.Title;
                DateFrom = learningDay.DateFrom;
                DateTo = learningDay.DateTo;
            }

            public int UserId { get; set; }
            public int TopicId { get; set; }
            public string FullName { get; set; }
            public string JobTitle { get; set; }
            public DateTime DateFrom { get; set; }
            public DateTime DateTo { get; set; }
        }

        private readonly SchedulearnContext _schedulearnContext;

        public IEnumerable<WorkerByTopicEntry> WorkersByTopic { get; set; }

        public AnalyzeDataVM(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }

        public Action<TopicIdWorker> GetWorkersByTopic => workerByTopic =>
        {
            WorkersByTopic = _schedulearnContext.LearningDays
                .Where(d => d.TopicId == workerByTopic.TopicId)
                .ToList()
                .Select(u => new WorkerByTopicEntry(u)).ToList();
            Changed(nameof(WorkersByTopic));
            PushUpdates();
        };
    }
}