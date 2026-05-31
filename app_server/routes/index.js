var express = require('express');
var router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlLocations.homeList);
router.get('/location/new', ctrlLocations.addLocationForm);
router.post('/location/new', ctrlLocations.doAddLocation);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router.get('/location/:locationId/edit', ctrlLocations.editLocationForm);
router.post('/location/:locationId/edit', ctrlLocations.doEditLocation);
router.get('/location/:locationId/delete', ctrlLocations.deleteLocation);
router.post('/location/:locationId/delete', ctrlLocations.doDeleteLocation);
router.get('/location/:locationId/review/new', ctrlLocations.addReview);
router.post('/location/:locationId/review/new', ctrlLocations.doAddReview);
router.get('/location/:locationId/review/:reviewId/edit', ctrlLocations.editReviewForm);
router.post('/location/:locationId/review/:reviewId/edit', ctrlLocations.doEditReview);
router.get('/location/:locationId/review/:reviewId/delete', ctrlLocations.deleteReview);
router.post('/location/:locationId/review/:reviewId/delete', ctrlLocations.doDeleteReview);

router.get('/about', ctrlOthers.about);
module.exports = router;
