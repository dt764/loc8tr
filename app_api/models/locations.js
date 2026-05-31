const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema ({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

const reviewSchema = new mongoose.Schema ({
    author: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: String,
    createdOn: { type: Date, default: Date.now }
});

const locationSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    address: String,
    rating: { type: Number, min: 0, max: 5 },
    facilities: [String],
    coords: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], index: '2dsphere'}
    },
    distance: String,
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

locationSchema.virtual('computedRating').get(function() {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
});

locationSchema.set('toJSON', { virtuals: true });

mongoose.model('Location', locationSchema);
