const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsReadAll = async (req, res) => {
    try{
    const locations = await Loc.find().exec();
    res
        .status(200)
        .json(locations);
    } catch (e){
        res.status(500).json({error: e.getMessage()})
    }
}

const locationsReadOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId).exec();
        if(!location)
            return res.status(404).json({message: "not found"});
        return res.status(200).json(location);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
} 

const locationsCreate = async (req, res) => {
    try{
        const location = await Loc.create(
            req.body
        );
        res.status(201).json(location);
    } catch(err){
        res.status(400).json(err);
    }

}

const locationsUpdate = async (req, res) => {
    try {
        const location = await Loc.findByIdAndUpdate(
            req.params.locationId,
            req.body,
            { new: true, runValidators: true }
        );
        if(!location)
            return res.status(404).json({message: "not found"});
        return res.status(200).json(location);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}

const locationsPartialUpdate = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationId).exec();
        if(!location)
            return res.status(404).json({message: "not found"});
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                location[key] = req.body[key];
            }
        }
        
        await location.save();
        return res.status(200).json(location);
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}

const locationsDelete = async (req, res) => {
    try {
        const location = await Loc.findByIdAndDelete(req.params.locationId);    
        if(!location)
            return res.status(404).json({message: "not found"});
        return res.status(204).json();
    } catch (err) {
        console.error(err.message);
        if(err.name === "CastError")
            return res.status(400).json({message: "Bad Request"})
        res.status(500).json({message: "Unknown Error"});
    }
}


module.exports = {
    locationsReadAll,
    locationsReadOne,
    locationsCreate,
    locationsUpdate,
    locationsPartialUpdate,
    locationsDelete
}
