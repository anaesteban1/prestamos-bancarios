namespace PrestamosBancarios.API.Models;

public class Loan
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Amount { get; set; }
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal? MonthlyPayment { get; set; }
    public string Status { get; set; } = "PENDING";
    public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;
    public DateTime? ApprovalDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User? User { get; set; }
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}