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
    [Migration("20200425203428_InitialDatabase")]
    partial class InitialDatabase
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
                            Title = "Software developer"
                        },
                        new
                        {
                            Id = 2,
                            Title = "Accountant"
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
                            Description = "Mokausi",
                            TopicId = 3,
                            UserId = 1
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
                            Description = "aaaa",
                            Name = "AAAA"
                        },
                        new
                        {
                            Id = 2,
                            Description = "bbbb",
                            Name = "BBBB",
                            ParentTopicId = 1
                        },
                        new
                        {
                            Id = 3,
                            Description = "cccc",
                            Name = "CCCC",
                            ParentTopicId = 1
                        },
                        new
                        {
                            Id = 4,
                            Description = "dddd",
                            Name = "DDDD",
                            ParentTopicId = 3
                        });
                });

            modelBuilder.Entity("SchedulearnBackend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("JobTitleId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("JobTitleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            JobTitleId = 1,
                            Name = "Vardenis",
                            Surname = "Pavardenis"
                        },
                        new
                        {
                            Id = 2,
                            JobTitleId = 2,
                            Name = "John",
                            Surname = "Cena"
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
                        .WithMany()
                        .HasForeignKey("UserId")
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
                });
#pragma warning restore 612, 618
        }
    }
}
