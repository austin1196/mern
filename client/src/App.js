import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accno, setAccno] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleDeposit = async () => {
    if (!accno || !amount) {
      toast.error('Account number and amount are required!');
      return;
    }
  
    console.log(`Deposit request: accno=${accno}, amount=${amount}`);
  
    try {
      const response = await axios.post('http://localhost:5000/api/deposit', {
        accno: parseInt(accno),
        amount: parseFloat(amount)
      });
  
      toast.success('Deposit successful! New Balance: ' + response.data.account.balance);
    } catch (error) {
      console.error(error);
      toast.error('Deposit failed!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Deposit Money</h1>
      <div>
        <input
          type="text"
          placeholder="Account Number"
          value={accno}
          onChange={(e) => setAccno(e.target.value)}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Amount to Deposit"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleDeposit}>Deposit</button>
      <ToastContainer />
    </div>
  );
}

export default App;
