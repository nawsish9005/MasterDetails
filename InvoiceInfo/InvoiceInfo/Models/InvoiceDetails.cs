namespace InvoiceInfo.Models
{
    public class InvoiceDetails
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Invoice Invoice { get; set; }
    }
}
