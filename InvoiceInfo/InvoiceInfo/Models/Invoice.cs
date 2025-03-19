using System.ComponentModel.DataAnnotations;

namespace InvoiceInfo.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "TotalAmount must be greater than zero.")]
        public decimal TotalAmount { get; set; }

        // Ensure this is correctly defined to link InvoiceDetails.
        public ICollection<InvoiceDetails> InvoiceDetails { get; set; } = new List<InvoiceDetails>();
    }
}
