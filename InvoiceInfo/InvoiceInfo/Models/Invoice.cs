namespace InvoiceInfo.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public decimal TotalAmount { get; set; }
        public ICollection<InvoiceDetails> InvoiceDetails { get; set; }
    }
}
