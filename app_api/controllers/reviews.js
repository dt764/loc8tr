const mongoose = require('mongoose');
const Loc = mongoose.model('Location');


const reviewsCreate = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).exec();
        if (!location) {
            return res
                .status(404)
                .json({message: 'not found'});
        }
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        const savedLocation =  await location.save();
        const review = savedLocation.reviews[savedLocation.reviews.length - 1];
        res
            .status(201)
            .json(review);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json(err);
    }
}

const reviewsReadOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).exec();
        if (!location) {
            return res
                .status(404)
                .json({message: 'not found'});
        }
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            return res
                .status(404)
                .json({message: 'not found'});
        }
        const response = {
            location: {
                name: location.name,
                _id: req.params.locationid
            },
            review: review
        };
        res
            .status(200)
            .json(response);

    } catch (err) {
        res
            .status(500)
            .json(err);
    }
}

const reviewsUpdateOne = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'reviewsUpdateOne'
    });
}

const reviewsDeleteOne = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'reviewsDeleteOne'
    });
}

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
}
