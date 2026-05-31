const axios = require('axios');
const apiOptions = {
    server: 'http://localhost:3000'
}

const renderHomePage = (req, res, locations) => {
    res.render('locations-list', {title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations
    })
}

const homeList = async (req, res) => {
    const path = '/api/locations';
    try {
        const locations = await axios.get(`${apiOptions.server}${path}`);
        renderHomePage(req, res, locations.data);

    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const locationInfo = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-info', {title: 'Location Info', location: location.data});
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const addReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-review-form', {title: 'Add Review', location: location.data});
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const doAddReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}/reviews`;
    const postData = {
        author: req.body.name,
        rating: req.body.rating,
        reviewText: req.body.review
    };

    try {
        await axios.post(`${apiOptions.server}${path}`, postData);
        res.redirect(`/location/${req.params.locationId}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const addLocationForm = async (req, res) => {
    res.render('location-form', {title: 'Add Location', location: {}});
}

const doAddLocation = async (req, res) => {
    const path = '/api/locations';
    const postData = {
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities ? req.body.facilities.split(',').map(f => f.trim()) : [],
        rating: 0,
        openingTimes: [],
        coords: {
            type: 'Point',
            coordinates: [parseFloat(req.body.lng) || 0, parseFloat(req.body.lat) || 0]
        }
    };

    try {
        const response = await axios.post(`${apiOptions.server}${path}`, postData);
        res.redirect(`/location/${response.data._id}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API create error"});
    }
}

const editLocationForm = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-form', {title: 'Edit Location', location: location.data});
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const doEditLocation = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    const putData = {
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities ? req.body.facilities.split(',').map(f => f.trim()) : [],
        coords: {
            type: 'Point',
            coordinates: [parseFloat(req.body.lng) || 0, parseFloat(req.body.lat) || 0]
        }
    };

    try {
        await axios.put(`${apiOptions.server}${path}`, putData);
        res.redirect(`/location/${req.params.locationId}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API update error"});
    }
}

const deleteLocation = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-delete', {title: 'Delete Location', location: location.data});
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const doDeleteLocation = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        await axios.delete(`${apiOptions.server}${path}`);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API delete error"});
    }
}

const editReviewForm = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        const review = location.data.reviews.find(r => r._id === req.params.reviewId);
        if (!review) {
            res.render('error', {error: new Error('Review not found'), message: "Review not found"});
            return;
        }
        res.render('location-review-edit-form', {
            title: 'Edit Review',
            location: location.data,
            review
        });
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const doEditReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}/reviews/${req.params.reviewId}`;
    const putData = {
        author: req.body.name,
        rating: req.body.rating,
        reviewText: req.body.review
    };

    try {
        await axios.put(`${apiOptions.server}${path}`, putData);
        res.redirect(`/location/${req.params.locationId}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API update error"});
    }
}

const deleteReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        const review = location.data.reviews.find(r => r._id === req.params.reviewId);
        if (!review) {
            res.render('error', {error: new Error('Review not found'), message: "Review not found"});
            return;
        }
        res.render('review-delete', {
            title: 'Delete Review',
            location: location.data,
            review
        });
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}

const doDeleteReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}/reviews/${req.params.reviewId}`;
    try {
        await axios.delete(`${apiOptions.server}${path}`);
        res.redirect(`/location/${req.params.locationId}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API delete error"});
    }
}

module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview,
    addLocationForm,
    doAddLocation,
    editLocationForm,
    doEditLocation,
    deleteLocation,
    doDeleteLocation,
    editReviewForm,
    doEditReview,
    deleteReview,
    doDeleteReview
}
