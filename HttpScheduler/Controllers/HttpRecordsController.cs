using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HttpScheduler.Context;
using HttpScheduler.Model;

namespace SchedulerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HttpRecordsController : ControllerBase
    {
        private readonly RecordContext _context;

        public HttpRecordsController(RecordContext context)
        {
            _context = context;
        }

        // GET: api/HttpRecords
        [HttpGet("action")]
        public async Task<ActionResult<IEnumerable<HttpRecord>>> GetActionableHttpRecords()
        {
            return await _context.HttpRecords
                .Where((r) => !r.Completed && r.Time < DateTimeOffset.Now.AddSeconds(10))
                .ToListAsync();
        }

        // GET: api/HttpRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HttpRecord>>> GetHttpRecords()
        {
            return await _context.HttpRecords.ToListAsync();
        }

        // GET: api/HttpRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HttpRecord>> GetHttpRecord(int id)
        {
            var httpRecord = await _context.HttpRecords.FindAsync(id);

            if (httpRecord == null)
            {
                return NotFound();
            }

            return httpRecord;
        }

        // PUT: api/HttpRecords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHttpRecord(int id, HttpRecord httpRecord)
        {
            if (id != httpRecord.HttpRecordId)
            {
                return BadRequest();
            }

            _context.Entry(httpRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HttpRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HttpRecords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HttpRecord>> PostHttpRecord(HttpRecord httpRecord)
        {
            _context.HttpRecords.Add(httpRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHttpRecord", new { id = httpRecord.HttpRecordId }, httpRecord);
        }

        // DELETE: api/HttpRecords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHttpRecord(int id)
        {
            var httpRecord = await _context.HttpRecords.FindAsync(id);
            if (httpRecord == null)
            {
                return NotFound();
            }

            _context.HttpRecords.Remove(httpRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HttpRecordExists(int id)
        {
            return _context.HttpRecords.Any(e => e.HttpRecordId == id);
        }
    }
}
