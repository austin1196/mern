const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
  
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/client', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Account Schema
const accountSchema = new mongoose.Schema({
    accno: Number,
    name: String,
    balance: Number
});

const Account = mongoose.model('Account', accountSchema);

// Deposit API
app.post('/api/deposit', async (req, res) => {
    console.log('Incoming deposit request:', req.body);  // Debug log
  
    const { accno, amount } = req.body;
  
    if (!accno || !amount) {
      return res.status(400).json({ message: 'Account Number and Amount are required' });
    }
  
    try {
      const account = await Account.findOne({ accno });
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      account.balance += amount;
      await account.save();
  
      res.json({ message: 'Deposit successful', account });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
