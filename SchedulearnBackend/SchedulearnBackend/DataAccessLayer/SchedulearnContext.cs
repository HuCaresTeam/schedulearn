using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.DataAccessLayer
{
    public class SchedulearnContext : DbContext
    {
        public SchedulearnContext(DbContextOptions<SchedulearnContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<LearningDay> LearningDays { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<Topic>()
                .HasMany(e => e.SubTopics)
                .WithOne()
                .HasForeignKey(e => e.ParentTopicId); //each comment from replies points back to its parent

            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 1, Title = "Software developer" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 2, Title = "Accountant" });

            modelbuilder.Entity<User>().HasData(new User() { Id = 1, Name = "Vardenis", Surname = "Pavardenis", JobTitleId = 1 });
            modelbuilder.Entity<User>().HasData(new User() { Id = 2, Name = "John", Surname = "Cena", JobTitleId = 2 });

            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 1, Name = "AAAA", Description = "aaaa" });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 2, Name = "BBBB", Description = "bbbb", ParentTopicId = 1 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 3, Name = "CCCC", Description = "cccc", ParentTopicId = 1 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 4, Name = "DDDD", Description = "dddd", ParentTopicId = 3 });

            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 1, UserId = 1, TopicId = 3, DateFrom = new DateTime(2020, 04, 25, 16, 00, 00), DateTo = new DateTime(2020, 04, 25, 17, 30, 00), Description = "Mokausi" });
        }

    }
}
