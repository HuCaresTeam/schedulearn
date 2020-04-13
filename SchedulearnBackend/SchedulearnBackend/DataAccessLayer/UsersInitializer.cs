using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using SchedulearnBackend.Models;

namespace SchedulearnBackend.DataAccessLayer
{
    //public class UsersInitializer : DropCreateDatabaseIfModelChanges<UserContext>
    //{
    //    protected override void Seed(UserContext context)
    //    {
    //        var jobTitles = new List<JobTitle>
    //        {
    //            new JobTitle{Title="Junior Software Developer"},
    //            new JobTitle{Title="Software Developer"},
    //            new JobTitle{Title="Senior Software Developer"}
    //        };
    //        jobTitles.ForEach(title => context.JobTitles.Add(title));
    //        context.SaveChanges();

    //        var users = new List<User>
    //        {
    //            new User{Name="Vardenis", Surname="Pavardenis", JobTitleID=1 },
    //            new User{Name="John", Surname="Smith", JobTitleID=2 },
    //            new User{Name="Samantha", Surname="Brown", JobTitleID=3 }
    //        };
    //        users.ForEach(user => context.Users.Add(user));
    //        context.SaveChanges();
    //    }
    //}
}
