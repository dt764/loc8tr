const controller = require('../../app_server/controllers/locations');

describe('controllers/locations', () => {

  test('homeList renders locations-list view with correct data', () => {
    const req = {};
    const res = {
      render: jest.fn()
    };

    controller.homeList(req, res);

    expect(res.render).toHaveBeenCalledWith(
      'locations-list',
      expect.objectContaining({
        title: expect.any(String),
        pageHeader: expect.any(Object),
        locations: expect.any(Array),
        sidebar: expect.any(String)
      })
    );
  });

  test('locationInfo renders location-info view', () => {
    const req = {};
    const res = {
      render: jest.fn()
    };

    controller.locationInfo(req, res);

    expect(res.render).toHaveBeenCalledWith(
      'location-info',
      expect.objectContaining({
        title: 'Location Info'
      })
    );
  });

  test('addReview renders location-review-form view', () => {
    const req = {};
    const res = {
      render: jest.fn()
    };

    controller.addReview(req, res);

    expect(res.render).toHaveBeenCalledWith(
      'location-review-form',
      expect.objectContaining({
        title: 'Add Review'
      })
    );
  });

});