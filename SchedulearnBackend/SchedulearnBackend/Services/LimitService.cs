using SchedulearnBackend.DataAccessLayer;
using SchedulearnBackend.Models;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulearnBackend.Services
{
    public class LimitService
    {
        private readonly SchedulearnContext _schedulearnContext;

        public LimitService(SchedulearnContext schedulearnContext) 
        {
            _schedulearnContext = schedulearnContext;
        }

        public async Task<Limit> GetLimitAsync(int id) 
        {
            var limit = await _schedulearnContext.Limits.FindAsync(id);
            return limit ?? throw new NotFoundException($"Limit with id ({id}) not found");
        } 
    }
}
