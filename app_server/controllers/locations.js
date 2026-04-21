const axios = require('axios');
const apiOptions = {
    server: 'http://localhost:3000'
};

const renderHomePage = (req, res, locations) => {
    // Implementation for rendering home page with locations
    res.render('locations-list', { title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations,
    });
};

const homeList  = async (req, res) => {
    const path = '/api/locations';
    try {
        const locations= await axios.get(`${apiOptions.server}${path}`)
        renderHomePage(req, res, locations.data);
        
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'API lookup error' });
    }
};

const locationInfo = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-info', { title: location.data.name, location: location.data });
    }catch (err) {
        console.error(err);
        res.render('error', { message: 'API lookup error' });
    }
}
const addReview = async (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-review-form', { title: `Review ${location.data.name} on Loc8r`, location: location.data });
    }catch (err) {
        console.error(err);
        res.render('error', { message: 'API lookup error' });
    }
}

module.exports = {
    homeList,
    locationInfo,
    addReview
}