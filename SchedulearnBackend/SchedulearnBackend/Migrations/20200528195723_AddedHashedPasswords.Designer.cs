﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SchedulearnBackend.DataAccessLayer;

namespace SchedulearnBackend.Migrations
{
    [DbContext(typeof(SchedulearnContext))]
    [Migration("20200528195723_AddedHashedPasswords")]
    partial class AddedHashedPasswords
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SchedulearnBackend.Models.JobTitle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("JobTitles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Title = "CEO"
                        },
                        new
                        {
                            Id = 2,
                            Title = "CTO"
                        },
                        new
                        {
                            Id = 3,
                            Title = "CFO"
                        },
                        new
                        {
                            Id = 4,
                            Title = "Software developer"
                        },
                        new
                        {
                            Id = 5,
                            Title = "Database analyst"
                        },
                        new
                        {
                            Id = 6,
                            Title = "Accountant"
                        },
                        new
                        {
                            Id = 7,
                            Title = "Financial analyst"
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.LearningDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateFrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTo")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TopicId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.HasIndex("UserId");

                    b.ToTable("LearningDays");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateFrom = new DateTime(2020, 4, 25, 16, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 25, 17, 30, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Object oriented programming",
                            TopicId = 2,
                            UserId = 4
                        },
                        new
                        {
                            Id = 2,
                            DateFrom = new DateTime(2020, 4, 26, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Java",
                            TopicId = 4,
                            UserId = 4
                        },
                        new
                        {
                            Id = 3,
                            DateFrom = new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 17, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi C#",
                            TopicId = 5,
                            UserId = 4
                        },
                        new
                        {
                            Id = 4,
                            DateFrom = new DateTime(2020, 4, 27, 11, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 27, 14, 30, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Procedural programming",
                            TopicId = 3,
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            DateFrom = new DateTime(2020, 4, 26, 10, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 18, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Object oriented programming",
                            TopicId = 2,
                            UserId = 5
                        },
                        new
                        {
                            Id = 6,
                            DateFrom = new DateTime(2020, 4, 27, 13, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 16, 30, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi C#",
                            TopicId = 5,
                            UserId = 5
                        },
                        new
                        {
                            Id = 7,
                            DateFrom = new DateTime(2020, 4, 26, 10, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 13, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Capital budgeting",
                            TopicId = 16,
                            UserId = 3
                        },
                        new
                        {
                            Id = 8,
                            DateFrom = new DateTime(2020, 4, 26, 14, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Sources of capital",
                            TopicId = 17,
                            UserId = 3
                        },
                        new
                        {
                            Id = 9,
                            DateFrom = new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(2020, 4, 26, 17, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = "Mokausi Dividend policy",
                            TopicId = 18,
                            UserId = 3
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Limit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LimitOfConsecutiveLearningDays")
                        .HasColumnType("int");

                    b.Property<int>("LimitOfLearningDaysPerMonth")
                        .HasColumnType("int");

                    b.Property<int>("LimitOfLearningDaysPerQuarter")
                        .HasColumnType("int");

                    b.Property<int>("LimitOfLearningDaysPerYear")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Limits");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LimitOfConsecutiveLearningDays = 3,
                            LimitOfLearningDaysPerMonth = 2,
                            LimitOfLearningDaysPerQuarter = 3,
                            LimitOfLearningDaysPerYear = 4,
                            Name = "Programer's limits"
                        },
                        new
                        {
                            Id = 2,
                            LimitOfConsecutiveLearningDays = 2,
                            LimitOfLearningDaysPerMonth = 1,
                            LimitOfLearningDaysPerQuarter = 3,
                            LimitOfLearningDaysPerYear = 3,
                            Name = "Accountant's limits"
                        },
                        new
                        {
                            Id = 3,
                            LimitOfConsecutiveLearningDays = 1,
                            LimitOfLearningDaysPerMonth = 2,
                            LimitOfLearningDaysPerQuarter = 2,
                            LimitOfLearningDaysPerYear = 2,
                            Name = "Financial analyst limits"
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Suggestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SuggesteeId")
                        .HasColumnType("int");

                    b.Property<int>("SuggesterId")
                        .HasColumnType("int");

                    b.Property<int>("TopicId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SuggesteeId");

                    b.HasIndex("SuggesterId");

                    b.HasIndex("TopicId");

                    b.ToTable("Suggestions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreationDate = new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified),
                            SuggesteeId = 4,
                            SuggesterId = 1,
                            TopicId = 1
                        },
                        new
                        {
                            Id = 2,
                            CreationDate = new DateTime(2020, 5, 2, 17, 0, 0, 0, DateTimeKind.Unspecified),
                            SuggesteeId = 4,
                            SuggesterId = 2,
                            TopicId = 2
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LimitId")
                        .HasColumnType("int");

                    b.Property<int>("ManagerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LimitId");

                    b.HasIndex("ManagerId")
                        .IsUnique();

                    b.ToTable("Teams");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LimitId = 1,
                            ManagerId = 1
                        },
                        new
                        {
                            Id = 2,
                            LimitId = 2,
                            ManagerId = 2
                        },
                        new
                        {
                            Id = 3,
                            LimitId = 3,
                            ManagerId = 3
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentTopicId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ParentTopicId");

                    b.ToTable("Topics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Learning description",
                            Name = "Learning"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Programming description",
                            Name = "Programming",
                            ParentTopicId = 1
                        },
                        new
                        {
                            Id = 3,
                            Description = "Object oriented programming description",
                            Name = "Object oriented programming",
                            ParentTopicId = 2
                        },
                        new
                        {
                            Id = 4,
                            Description = "Procedural programming description",
                            Name = "Procedural programming",
                            ParentTopicId = 2
                        },
                        new
                        {
                            Id = 5,
                            Description = "Java description",
                            Name = "Java",
                            ParentTopicId = 3
                        },
                        new
                        {
                            Id = 6,
                            Description = "C# description",
                            Name = "C#",
                            ParentTopicId = 3
                        },
                        new
                        {
                            Id = 7,
                            Description = "C description",
                            Name = "C",
                            ParentTopicId = 4
                        },
                        new
                        {
                            Id = 8,
                            Description = "Pascal description",
                            Name = "Pascal",
                            ParentTopicId = 4
                        },
                        new
                        {
                            Id = 9,
                            Description = "Finances description",
                            Name = "Finances",
                            ParentTopicId = 1
                        },
                        new
                        {
                            Id = 10,
                            Description = "Corporate finance description",
                            Name = "Corporate finance",
                            ParentTopicId = 9
                        },
                        new
                        {
                            Id = 11,
                            Description = "Public finance description",
                            Name = "Public finance",
                            ParentTopicId = 9
                        },
                        new
                        {
                            Id = 12,
                            Description = "Short term financial management description",
                            Name = "Short term financial management",
                            ParentTopicId = 10
                        },
                        new
                        {
                            Id = 13,
                            Description = "Debtors management description",
                            Name = "Debtors management",
                            ParentTopicId = 12
                        },
                        new
                        {
                            Id = 14,
                            Description = "Inventory management description",
                            Name = "Inventory management",
                            ParentTopicId = 12
                        },
                        new
                        {
                            Id = 15,
                            Description = "Cash management description",
                            Name = "Cash management",
                            ParentTopicId = 12
                        },
                        new
                        {
                            Id = 16,
                            Description = "Longer term financial management description",
                            Name = "Longer term financial management",
                            ParentTopicId = 10
                        },
                        new
                        {
                            Id = 17,
                            Description = "Capital budgeting description",
                            Name = "Capital budgeting",
                            ParentTopicId = 16
                        },
                        new
                        {
                            Id = 18,
                            Description = "Sources of capital description",
                            Name = "Sources of capital",
                            ParentTopicId = 16
                        },
                        new
                        {
                            Id = 19,
                            Description = "Dividend policy description",
                            Name = "Dividend policy",
                            ParentTopicId = 16
                        },
                        new
                        {
                            Id = 20,
                            Description = "Identification of required expenditure of a public sector entity description",
                            Name = "Identification of required expenditure of a public sector entity",
                            ParentTopicId = 11
                        },
                        new
                        {
                            Id = 21,
                            Description = "Sources of entity's revenue description",
                            Name = "Sources of entity's revenue",
                            ParentTopicId = 11
                        },
                        new
                        {
                            Id = 22,
                            Description = "Debt issuance for public works projects description",
                            Name = "Debt issuance for public works projects",
                            ParentTopicId = 11
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("JobTitleId")
                        .HasColumnType("int");

                    b.Property<int?>("LimitId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RegistrationGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobTitleId");

                    b.HasIndex("LimitId");

                    b.HasIndex("TeamId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "Vadovu.Vadovas@schedulearn.com",
                            JobTitleId = 1,
                            Name = "Vadovu",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("e4e131ee-6a7b-40d6-a6a8-cfbd32997a2a"),
                            Surname = "Vadovas"
                        },
                        new
                        {
                            Id = 2,
                            Email = "Technologiju.Vadovas@schedulearn.com",
                            JobTitleId = 2,
                            Name = "Technologiju",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("5f4bfdaf-8b11-4df1-becf-fd31b1c47f6a"),
                            Surname = "Vadovas",
                            TeamId = 1
                        },
                        new
                        {
                            Id = 3,
                            Email = "Finansu.Vadovas@schedulearn.com",
                            JobTitleId = 3,
                            Name = "Finansu",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("3dcbf76f-45cf-404e-9270-9f947fd68b9b"),
                            Surname = "Vadovas",
                            TeamId = 1
                        },
                        new
                        {
                            Id = 4,
                            Email = "Vardenis.Pavardenis@schedulearn.com",
                            JobTitleId = 4,
                            Name = "Vardenis",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("41584cd2-08fb-4b9f-8f43-080cb62bc07a"),
                            Surname = "Pavardenis",
                            TeamId = 2
                        },
                        new
                        {
                            Id = 5,
                            Email = "Petras.Petrauskas@schedulearn.com",
                            JobTitleId = 4,
                            Name = "Petras",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("1effd040-aed1-42b4-9379-7cc72f218a56"),
                            Surname = "Petrauskas",
                            TeamId = 2
                        },
                        new
                        {
                            Id = 6,
                            Email = "Jonas.Jonauskas@schedulearn.com",
                            JobTitleId = 5,
                            LimitId = 3,
                            Name = "Jonas",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("78b1ea94-52f7-4066-936c-3861d2062305"),
                            Surname = "Jonauskas",
                            TeamId = 2
                        },
                        new
                        {
                            Id = 7,
                            Email = "Tomas.Tomauskas@schedulearn.com",
                            JobTitleId = 6,
                            Name = "Tomas",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("cb26fa8c-70c2-4922-ac4c-09dcfc6285f9"),
                            Surname = "Tomauskas",
                            TeamId = 3
                        },
                        new
                        {
                            Id = 8,
                            Email = "John.Cena@schedulearn.com",
                            JobTitleId = 7,
                            Name = "John",
                            Password = "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=",
                            RegistrationGuid = new Guid("f23c837c-8992-495c-a092-9f54c2fcdbaf"),
                            Surname = "Cena",
                            TeamId = 3
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.LearningDay", b =>
                {
                    b.HasOne("SchedulearnBackend.Models.Topic", "Topic")
                        .WithMany()
                        .HasForeignKey("TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SchedulearnBackend.Models.User", "User")
                        .WithMany("LearningDays")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Suggestion", b =>
                {
                    b.HasOne("SchedulearnBackend.Models.User", "Suggestee")
                        .WithMany()
                        .HasForeignKey("SuggesteeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SchedulearnBackend.Models.User", "Suggester")
                        .WithMany("Suggestions")
                        .HasForeignKey("SuggesterId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("SchedulearnBackend.Models.Topic", "Topic")
                        .WithMany()
                        .HasForeignKey("TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Team", b =>
                {
                    b.HasOne("SchedulearnBackend.Models.Limit", "Limit")
                        .WithMany()
                        .HasForeignKey("LimitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SchedulearnBackend.Models.User", "Manager")
                        .WithOne("ManagedTeam")
                        .HasForeignKey("SchedulearnBackend.Models.Team", "ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SchedulearnBackend.Models.Topic", b =>
                {
                    b.HasOne("SchedulearnBackend.Models.Topic", "ParentTopic")
                        .WithMany("SubTopics")
                        .HasForeignKey("ParentTopicId");
                });

            modelBuilder.Entity("SchedulearnBackend.Models.User", b =>
                {
                    b.HasOne("SchedulearnBackend.Models.JobTitle", "JobTitle")
                        .WithMany()
                        .HasForeignKey("JobTitleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SchedulearnBackend.Models.Limit", "Limit")
                        .WithMany()
                        .HasForeignKey("LimitId");

                    b.HasOne("SchedulearnBackend.Models.Team", "Team")
                        .WithMany("Members")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.NoAction);
                });
#pragma warning restore 612, 618
        }
    }
}
