using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrestamosBancarios.API.Data;
using PrestamosBancarios.API.Models;

namespace PrestamosBancarios.API.Controllers;

[ApiController]
[Route("loans")]
public class LoansController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LoansController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Loan>> CreateLoan(Loan loan)
    {
        loan.Status = "PENDING";
        loan.ApplicationDate = DateTime.UtcNow;
        loan.CreatedAt = DateTime.UtcNow;

        _context.Loans.Add(loan);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLoan), new { id = loan.Id }, loan);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
    {
        return await _context.Loans
            .Include(l => l.Payments)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Loan>> GetLoan(int id)
    {
        var loan = await _context.Loans
            .Include(l => l.Payments)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (loan == null)
            return NotFound();

        return loan;
    }

    [HttpPost("{id}/payment")]
    public async Task<ActionResult<Payment>> AddPayment(int id, Payment payment)
    {
        var loan = await _context.Loans.FindAsync(id);

        if (loan == null)
            return NotFound();

        payment.LoanId = id;
        payment.PaymentDate = DateTime.UtcNow;
        payment.CreatedAt = DateTime.UtcNow;

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        return Ok(payment);
    }
}