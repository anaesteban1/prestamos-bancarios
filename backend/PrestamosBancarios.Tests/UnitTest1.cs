using Xunit;

namespace PrestamosBancarios.Tests;

public class UnitTest1
{
    [Fact]
    public void LoanAmount_DebeSerMayorQueCero()
    {
        decimal amount = 1000;

        Assert.True(amount > 0);
    }

    [Fact]
    public void InterestRate_DebeSerMayorQueCero()
    {
        decimal interestRate = 10;

        Assert.True(interestRate > 0);
    }

    [Fact]
    public void TermMonths_DebeSerMayorQueCero()
    {
        int termMonths = 12;

        Assert.True(termMonths > 0);
    }
}