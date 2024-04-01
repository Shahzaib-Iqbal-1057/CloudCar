import mongoose from "mongoose";
const schema = mongoose.Schema;

const rental = new schema({
    rentalId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    car: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    renter: {
        type: String,
        required: true
    },
    ownerReview:{
        type: String,
        required: false
    },
    renterReview:{
        type: String,
        required: false
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    ownerReview:{
        type: Date,
        required: false
    },
    renterReview:{
        type: Date,
        required: false
    },
    ownerImages: {
        type: [String],
        required: false
    },
    renterImages: {
        type: [String],
        required: false
    },
    amount: {
        type: Number,
        required: true
    }

}, {timestamps: true})

const Rental = mongoose.model('Rental', rental);
export default Rental;