const homeList  = (req, res) => {
    res.render('locations-list', { 
        title: 'Loc8tr - find nearby places to work with wifi',
        pageHeader: {
            title: 'Loc8tr',
            strapline: 'Find places to work with wifi near you!'
        },
        locations: [
            {
                name: 'Starcups',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '100m'
            },
        ],
        sidebar: "Looking for wifi and a seat? Loc8tr helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8tr help you find the place you're looking for."
    });
}
const locationInfo = (req, res) => {
    res.render('location-info', { title: 'Location Info' });
}
const addReview = (req, res) => {
    res.render('location-review-form', { title: 'Add Review' });
}

module.exports = {
    homeList,
    locationInfo,
    addReview
}