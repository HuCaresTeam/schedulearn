using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.DataAccessLayer
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<Topic> Topics { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<Topic>()
                .HasMany(e => e.SubTopics)
                .WithOne()
                .HasForeignKey(e => e.ParentTopicId); //each comment from replies points back to its parent
            
        }

    }
}
