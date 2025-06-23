import mongoose from 'mongoose';

const ExpensesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        
    },
    responsiblePerson: {
        type: String,
        trim: true
    },
    phone:{
        type: String,
        required: true

    },
    notes: {
        type: String,
        trim: true
    }
});

export default mongoose.model('Expenses', ExpensesSchema);
