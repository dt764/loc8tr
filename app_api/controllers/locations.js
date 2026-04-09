const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsReadAll = async (req, res) => {
    try {

        const locations = await Loc.find().exec();
        res
            .status(200)
            .json(locations);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
}



const locationsCreate = async (req, res) => {
    try {
        const location = await Loc.create(req.body);
        res
            .status(201)
            .json(location);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
}

const locationsReadOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).exec();
        if (!location) {
            return res
                .status(404)
                .json({message: 'not found'});
        }
        res
            .status(200)
            .json(location);
       
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
}

const locationsUpdateOne = async (req, res) => {
    try {
        const locations = await Loc.findByIdAndUpdate(req.params.locationid, req.body).exec();
        res
            .status(200)
            .json(locations);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
}

const locationsDeleteOne = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'locationsDeleteOne'
    });
}

module.exports = {
    locationsReadAll,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
}