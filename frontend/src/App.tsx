import React, { useEffect, useState } from 'react';
import './App.css';
import { Loan as LoanModel } from './models/loan';
import UserHome from './components/userHome';

function App() {
  const [loans, setLoans] = useState<LoanModel[]>([]);

  useEffect(() => {
    async function loadLoans() {
      try {
        const response = await fetch("/api/loans", { method: "GET" });
        const loans = await response.json();
        setLoans(loans);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadLoans();
  }, []);

  const handleSubmitLoan = async (formData: any) => {
    try {
      const response = await fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newLoan = await response.json();
        setLoans([...loans, newLoan]);  // Add new loan to state
      } else {
        alert("Failed to submit loan application");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="App">
      <UserHome loans={loans} onSubmitLoan={handleSubmitLoan} />
    </div>
  );
}

export default App
