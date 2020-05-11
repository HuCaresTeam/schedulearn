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
        public DbSet<Team> Teams { get; set; }
        public DbSet<Limit> Limits { get; set; }
        public DbSet<Suggestion> Suggestions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<Topic>()
                .HasMany(e => e.SubTopics)
                .WithOne(e => e.ParentTopic)
                .HasForeignKey(e => e.ParentTopicId);

            modelbuilder.Entity<Team>()
                .HasMany(e => e.Members)
                .WithOne(e => e.Team)
                .HasForeignKey(e => e.TeamId)
                .OnDelete(DeleteBehavior.NoAction);

            modelbuilder.Entity<Suggestion>()
                .HasOne(e => e.Suggester)
                .WithMany(e => e.Suggestions)
                .HasForeignKey(e => e.SuggesterId)
                .OnDelete(DeleteBehavior.NoAction);


            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 1, Title = "CEO" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 2, Title = "CTO" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 3, Title = "CFO" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 4, Title = "Software developer" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 5, Title = "Database analyst" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 6, Title = "Accountant" });
            modelbuilder.Entity<JobTitle>().HasData(new JobTitle() { Id = 7, Title = "Financial analyst" });

            modelbuilder.Entity<Limit>().HasData(new Limit() { Id = 1, LimitOfConsecutiveLearningDays = 3, LimitOfLearningDaysPerMonth = 2, LimitOfLearningDaysPerQuarter = 3, LimitOfLearningDaysPerYear = 4 });
            modelbuilder.Entity<Limit>().HasData(new Limit() { Id = 2, LimitOfConsecutiveLearningDays = 2, LimitOfLearningDaysPerMonth = 1, LimitOfLearningDaysPerQuarter = 3, LimitOfLearningDaysPerYear = 3 });
            modelbuilder.Entity<Limit>().HasData(new Limit() { Id = 3, LimitOfConsecutiveLearningDays = 1, LimitOfLearningDaysPerMonth = 2, LimitOfLearningDaysPerQuarter = 2, LimitOfLearningDaysPerYear = 2 });


            //CEO team
            modelbuilder.Entity<User>().HasData(new User() { Id = 1, Name = "Vadovu", Surname = "Vadovas", Email = "Vadovu.Vadovas@schedulearn.com", JobTitleId = 1, Password = "123" });
            modelbuilder.Entity<Team>().HasData(new Team() { Id = 1, LimitId = 1, ManagerId = 1 });
            modelbuilder.Entity<User>().HasData(new User() { Id = 2, Name = "Technologiju", Surname = "Vadovas", Email = "Technologiju.Vadovas@schedulearn.com", JobTitleId = 2, TeamId = 1, Password = "123" });
            modelbuilder.Entity<User>().HasData(new User() { Id = 3, Name = "Finansu", Surname = "Vadovas", Email = "Finansu.Vadovas@schedulearn.com", JobTitleId = 3, TeamId = 1, Password = "123" });

            //CTO team
            modelbuilder.Entity<Team>().HasData(new Team() { Id = 2, LimitId = 2, ManagerId = 2 });
            modelbuilder.Entity<User>().HasData(new User() { Id = 4, Name = "Vardenis", Surname = "Pavardenis", Email = "Vardenis.Pavardenis@schedulearn.com", JobTitleId = 4, TeamId = 2, Password = "123" });
            modelbuilder.Entity<User>().HasData(new User() { Id = 5, Name = "Petras", Surname = "Petrauskas", Email = "Petras.Petrauskas@schedulearn.com", JobTitleId = 4, TeamId = 2, Password = "123" });
            modelbuilder.Entity<User>().HasData(new User() { Id = 6, Name = "Jonas", Surname = "Jonauskas", Email = "Jonas.Jonauskas@schedulearn.com", JobTitleId = 5, TeamId = 2, LimitId = 3, Password = "123" });

            //CFO team
            modelbuilder.Entity<Team>().HasData(new Team() { Id = 3, LimitId = 3, ManagerId = 3 });
            modelbuilder.Entity<User>().HasData(new User() { Id = 7, Name = "Tomas", Surname = "Tomauskas", Email = "Tomas.Tomauskas@schedulearn.com", JobTitleId = 6, TeamId = 3, Password = "123" });
            modelbuilder.Entity<User>().HasData(new User() { Id = 8, Name = "John", Surname = "Cena", Email = "John.Cena@schedulearn.com", JobTitleId = 7, TeamId = 3, Password = "123" });


            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 1, Name = "Learning", Description = "Learning description" });

            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 2, Name = "Programming", Description = "Programming description", ParentTopicId = 1 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 3, Name = "Object oriented programming", Description = "Object oriented programming description", ParentTopicId = 2 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 4, Name = "Procedural programming", Description = "Procedural programming description", ParentTopicId = 2 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 5, Name = "Java", Description = "Java description", ParentTopicId = 3 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 6, Name = "C#", Description = "C# description", ParentTopicId = 3 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 7, Name = "C", Description = "C description", ParentTopicId = 4 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 8, Name = "Pascal", Description = "Pascal description", ParentTopicId = 4 });

            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 9, Name = "Finances", Description = "Finances description", ParentTopicId = 1 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 10, Name = "Corporate finance", Description = "Corporate finance description", ParentTopicId = 9 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 11, Name = "Public finance", Description = "Public finance description", ParentTopicId = 9 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 12, Name = "Short term financial management", Description = "Short term financial management description", ParentTopicId = 10 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 13, Name = "Debtors management", Description = "Debtors management description", ParentTopicId = 12 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 14, Name = "Inventory management", Description = "Inventory management description", ParentTopicId = 12 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 15, Name = "Cash management", Description = "Cash management description", ParentTopicId = 12 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 16, Name = "Longer term financial management", Description = "Longer term financial management description", ParentTopicId = 10 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 17, Name = "Capital budgeting", Description = "Capital budgeting description", ParentTopicId = 16 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 18, Name = "Sources of capital", Description = "Sources of capital description", ParentTopicId = 16 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 19, Name = "Dividend policy", Description = "Dividend policy description", ParentTopicId = 16 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 20, Name = "Identification of required expenditure of a public sector entity", Description = "Identification of required expenditure of a public sector entity description", ParentTopicId = 11 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 21, Name = "Sources of entity's revenue", Description = "Sources of entity's revenue description", ParentTopicId = 11 });
            modelbuilder.Entity<Topic>().HasData(new Topic() { Id = 22, Name = "Debt issuance for public works projects", Description = "Debt issuance for public works projects description", ParentTopicId = 11 });


            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 1, UserId = 4, TopicId = 2, DateFrom = new DateTime(2020, 04, 25, 16, 00, 00), DateTo = new DateTime(2020, 04, 25, 17, 30, 00), Description = "Mokausi Object oriented programming" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 2, UserId = 4, TopicId = 4, DateFrom = new DateTime(2020, 04, 26, 12, 00, 00), DateTo = new DateTime(2020, 04, 26, 15, 30, 00), Description = "Mokausi Java" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 3, UserId = 4, TopicId = 5, DateFrom = new DateTime(2020, 04, 26, 15, 30, 00), DateTo = new DateTime(2020, 04, 26, 17, 00, 00), Description = "Mokausi C#" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 4, UserId = 4, TopicId = 3, DateFrom = new DateTime(2020, 04, 27, 11, 30, 00), DateTo = new DateTime(2020, 04, 27, 14, 30, 00), Description = "Mokausi Procedural programming" });

            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 5, UserId = 5, TopicId = 2, DateFrom = new DateTime(2020, 04, 26, 10, 30, 00), DateTo = new DateTime(2020, 04, 26, 18, 00, 00), Description = "Mokausi Object oriented programming" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 6, UserId = 5, TopicId = 5, DateFrom = new DateTime(2020, 04, 27, 13, 00, 00), DateTo = new DateTime(2020, 04, 26, 16, 30, 00), Description = "Mokausi C#" });

            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 7, UserId = 3, TopicId = 16, DateFrom = new DateTime(2020, 04, 26, 10, 30, 00), DateTo = new DateTime(2020, 04, 26, 13, 00, 00), Description = "Mokausi Capital budgeting" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 8, UserId = 3, TopicId = 17, DateFrom = new DateTime(2020, 04, 26, 14, 30, 00), DateTo = new DateTime(2020, 04, 26, 15, 30, 00), Description = "Mokausi Sources of capital" });
            modelbuilder.Entity<LearningDay>().HasData(new LearningDay() { Id = 9, UserId = 3, TopicId = 18, DateFrom = new DateTime(2020, 04, 26, 15, 30, 00), DateTo = new DateTime(2020, 04, 26, 17, 00, 00), Description = "Mokausi Dividend policy" });


            modelbuilder.Entity<Suggestion>().HasData(new Suggestion() { Id = 1, TopicId = 1, SuggesteeId = 4, SuggesterId = 1, CreationDate = new DateTime(2020, 04, 26, 15, 30, 00) });
            modelbuilder.Entity<Suggestion>().HasData(new Suggestion() { Id = 2, TopicId = 2, SuggesteeId = 4, SuggesterId = 2, CreationDate = new DateTime(2020, 05, 02, 17, 00, 00) });

        }

    }
}
