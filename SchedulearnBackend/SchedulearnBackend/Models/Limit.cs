﻿namespace SchedulearnBackend.Models
{
    public class Limit
    {
        public int Id { get; set; }
        public int LimitOfConsecutiveLearningDays { get; set; }
        public int LimitOfLearningDaysPerMonth { get; set; }
        public int LimitOfLearningDaysPerQuarter { get; set; }
        public int LimitOfLearningDaysPerYear { get; set; }
    }
}
