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
        console.log(locations);
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

    console.log(req.body);
    console.log(postData);

    try {
        await axios.post(`${apiOptions.server}${path}`, postData);
        res.redirect(`/location/${req.params.locationId}`);
    } catch (err) {
        console.error(err);
        res.render('error', {error: err, message: "API lookup error"});
    }
}


module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview
}
