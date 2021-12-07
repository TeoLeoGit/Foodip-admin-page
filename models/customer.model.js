const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avataUrl: String,
    phone: String,
    address: String,
    activeFlag: {
        type: Number,
        default: 1
    },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;