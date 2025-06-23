import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  notes: { type: String, default: "" },
  startDate: { type: Date, required: true },
  responsiblePerson: {
    type: String,
    trim: true
},
phone:{
  type: String,
  required: true

}


});


export default mongoose.model('Budget', budgetSchema);