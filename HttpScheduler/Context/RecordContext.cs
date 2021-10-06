using HttpScheduler.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HttpScheduler.Context
{
    public class RecordContext: DbContext
    {
        public RecordContext(DbContextOptions<RecordContext> options) : base(options)
        {
        }

        public DbSet<HttpRecord> HttpRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<HttpRecord>().ToTable("HttpRecord");
        }
    }
}
