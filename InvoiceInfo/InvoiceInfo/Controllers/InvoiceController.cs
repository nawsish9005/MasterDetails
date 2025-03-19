using InvoiceInfo.Data;
using InvoiceInfo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceInfo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : Controller
    {
        private readonly ApplicationDbContext _context;
        [HttpPost("create-invoice")]
        public async Task<IActionResult> CreateInvoice([FromBody] Invoice invoice)
        {
            if (invoice == null || invoice.InvoiceDetails == null || !invoice.InvoiceDetails.Any())
            {
                return BadRequest("Invalid invoice data.");
            }

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }
        [HttpGet("get-invoices")]
        public async Task<IActionResult> GetInvoices()
        {
            var invoices = await _context.Invoices.Include(i => i.InvoiceDetails).ToListAsync();
            return Ok(invoices);
        }

        [HttpGet("get-invoice/{id}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.Include(i => i.InvoiceDetails).FirstOrDefaultAsync(i => i.Id == id);
            if (invoice == null)
                return NotFound();
            return Ok(invoice);
        }

        [HttpPut("update-invoice/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] Invoice invoice)
        {
            if (id != invoice.Id)
                return BadRequest("Invoice ID mismatch.");

            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("delete-invoice/{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
                return NotFound();

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
