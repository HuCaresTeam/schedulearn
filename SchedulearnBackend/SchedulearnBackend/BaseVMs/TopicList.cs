using System;
using DotNetify;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchedulearnBackend.Models;
using SchedulearnBackend.DataAccessLayer;

namespace SchedulearnBackend
{
    public class TopicList : BaseVM
    {
        public class NestedListTopic
        {
            public NestedListTopic(Topic topic)
            {
                Id = topic.Id;
                Label = topic.Name;
                Description = topic.Description;
                ParentTopicId = topic.ParentTopicId;
                SubItems = topic.SubTopics.Select(t => new NestedListTopic(t));
            }
            public int Id { get; set; }
            public string Label { get; set; }           
            public string Description { get; set; }
            public int? ParentTopicId { get; set; }      
            public virtual IEnumerable<NestedListTopic> SubItems { get; set; }
        }
        private readonly SchedulearnContext _schedulearnContext;
        public NestedListTopic RootTopic 
        { 
            get 
            { 
                return _schedulearnContext.Topics
                    .Where(t => t.ParentTopicId == null)
                    .ToList()
                    .Select(t => new NestedListTopic(t))
                    .First(); 
            } 
        }
        public TopicList(SchedulearnContext schedulearnContext)
        {
            _schedulearnContext = schedulearnContext;
        }
    }
}
