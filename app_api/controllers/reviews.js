const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsReadOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId)
                                .select("name reviews").exec();
        if(!location)
            return res.status(404).json({message: "Location not found"});

        const review = location.reviews.id(req.params.reviewId);
        if(!review)
            return res.status(404).json({message: "Review not found"});

        const response = {
            location: {
                name: location.name,
                _id: req.params.locationId
            },
            review,
        }
        return res.status(200).json(review);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
} 

const reviewsCreate = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId)
                                .select("name reviews").exec();
        if(!location)
            return res.status(404).json({message: "Location not found"});

        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        
        const savedLocation = await location.save();

        const review = savedLocation.reviews[savedLocation.reviews.length-1];
        
        return res.status(200).json(review);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
} 

const reviewsUpdateOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId)
                                .select("reviews").exec();
        if(!location)
            return res.status(404).json({message: "Location not found"});

        const review = location.reviews.id(req.params.reviewId);
        if(!review)
            return res.status(404).json({message: "Review not found"});

        review.author = req.body.author;
        review.rating = req.body.rating;
        review.reviewText = req.body.reviewText;

        await location.save();
        return res.status(200).json(review);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}

const reviewsPatchOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId)
                                .select("reviews").exec();
        if(!location)
            return res.status(404).json({message: "Location not found"});

        const review = location.reviews.id(req.params.reviewId);
        if(!review)
            return res.status(404).json({message: "Review not found"});

        if(req.body.author) review.author = req.body.author;
        if(req.body.rating) review.rating = req.body.rating;
        if(req.body.reviewText) review.reviewText = req.body.reviewText;

        await location.save();
        return res.status(200).json(review);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}

const reviewsDeleteOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId)
                                .select("reviews").exec();
        if(!location)
            return res.status(404).json({message: "Location not found"});

        const review = location.reviews.id(req.params.reviewId);
        if(!review)
            return res.status(404).json({message: "Review not found"});

        review.deleteOne();
        await location.save();
        return res.status(204).json();
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}

module.exports = {
    reviewsReadOne,
    reviewsCreate,
    reviewsUpdateOne,
    reviewsPatchOne,
    reviewsDeleteOne
}
