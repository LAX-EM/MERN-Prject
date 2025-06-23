// api/models/incomeModel.js
import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  incomeSource: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  incomeCategory: {
    type: String,
    required: true, 
  },
  incomeType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  phone:{
    type: String,
    required: true  
  }
});

export default mongoose.model('Income', incomeSchema);

