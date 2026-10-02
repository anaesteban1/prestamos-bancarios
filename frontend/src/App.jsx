import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loanForm, setLoanForm] = useState({
    userId: 1,
    amount: "",
    interestRate: "",
    termMonths: ""
  });

  const [paymentForm, setPaymentForm] = useState({
    loanId: "",
    amount: "",
    paymentMethod: "TRANSFER"
  });

  const loadLoans = async () => {
    try {
      const response = await axios.get("http://localhost:5171/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error al obtener prestamos:", error);
    }
  };

  const loadPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5171/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    }
  };

  useEffect(() => {
    loadLoans();
    loadPayments();
  }, []);

  const handleLoanChange = (e) => {
    setLoanForm({
      ...loanForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(loanForm.amount) <= 0 ||
      Number(loanForm.interestRate) <= 0 ||
      Number(loanForm.termMonths) <= 0
    ) {
      alert("Todos los valores deben ser mayores que cero.");
      return;
    }

    try {
      await axios.post("http://localhost:5171/loans", {
        userId: Number(loanForm.userId),
        amount: Number(loanForm.amount),
        interestRate: Number(loanForm.interestRate),
        termMonths: Number(loanForm.termMonths)
      });

      alert("Prestamo solicitado correctamente.");

      setLoanForm({
        userId: 1,
        amount: "",
        interestRate: "",
        termMonths: ""
      });

      loadLoans();
    } catch (error) {
      console.error(error);
      alert("Error al solicitar el prestamo.");
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(paymentForm.loanId) <= 0 ||
      Number(paymentForm.amount) <= 0
    ) {
      alert("Los datos del pago no son validos.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5171/loans/${paymentForm.loanId}/payment`,
        {
          amount: Number(paymentForm.amount),
          paymentMethod: paymentForm.paymentMethod
        }
      );

      alert("Pago registrado correctamente.");

      setPaymentForm({
        loanId: "",
        amount: "",
        paymentMethod: "TRANSFER"
      });

      loadLoans();
      loadPayments();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el pago.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Prestamos Bancarios</h1>

      <h2>Solicitar prestamo</h2>

      <form onSubmit={handleLoanSubmit}>
        <div>
          <label>Usuario: </label>
          <input
            type="number"
            name="userId"
            value={loanForm.userId}
            onChange={handleLoanChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Monto: </label>
          <input
            type="number"
            name="amount"
            value={loanForm.amount}
            onChange={handleLoanChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Tasa de interes: </label>
          <input
            type="number"
            name="interestRate"
            value={loanForm.interestRate}
            onChange={handleLoanChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Plazo en meses: </label>
          <input
            type="number"
            name="termMonths"
            value={loanForm.termMonths}
            onChange={handleLoanChange}
            min="1"
            required
          />
        </div>

        <br />

        <button type="submit">
          Solicitar prestamo
        </button>
      </form>

      <hr />

      <h2>Registrar pago</h2>

      <form onSubmit={handlePaymentSubmit}>
        <div>
          <label>ID del prestamo: </label>
          <input
            type="number"
            name="loanId"
            value={paymentForm.loanId}
            onChange={handlePaymentChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Monto del pago: </label>
          <input
            type="number"
            name="amount"
            value={paymentForm.amount}
            onChange={handlePaymentChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>Metodo de pago: </label>
          <select
            name="paymentMethod"
            value={paymentForm.paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="TRANSFER">TRANSFER</option>
            <option value="CARD">CARD</option>
            <option value="CASH">CASH</option>
          </select>
        </div>

        <br />

        <button type="submit">
          Registrar pago
        </button>
      </form>

      <hr />

      <h2>Lista de prestamos</h2>

      {loans.map((loan) => (
        <div key={loan.id}>
          <p>
            Prestamo #{loan.id} - Monto: S/ {loan.amount} - Estado: {loan.status}
          </p>
        </div>
      ))}

      <hr />

      <h2>Historial de pagos</h2>

      {payments.map((payment) => (
        <div key={payment.id}>
          <p>
            Pago #{payment.id} - Prestamo #{payment.loanId} - Monto: S/ {payment.amount} - Metodo: {payment.paymentMethod}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;