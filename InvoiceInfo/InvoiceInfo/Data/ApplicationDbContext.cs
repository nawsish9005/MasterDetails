using InvoiceInfo.Models;
using Microsoft.EntityFrameworkCore;

namespace InvoiceInfo.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetails> InvoiceDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InvoiceDetails>()
                .HasOne(id => id.Invoice)
                .WithMany(i => i.InvoiceDetails)
                .HasForeignKey(id => id.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(true);

            base.OnModelCreating(modelBuilder);
        }
    }
}