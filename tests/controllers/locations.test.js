const axios = require('axios');
jest.mock('axios');

const controllers = require('../../app_server/controllers/locations');

describe('locations controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('homeList renders locations-list with expected data', async () => {
    const locations = [{ name: 'Test', _id: '123' }];
    axios.get.mockResolvedValue({ data: locations });

    const req = {};
    const res = { render: jest.fn() };
    await controllers.homeList(req, res);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/locations');
    expect(res.render).toHaveBeenCalledWith('locations-list', expect.objectContaining({
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: expect.objectContaining({ title: 'Loc8r' }),
      locations
    }));
  });

  test('locationInfo renders location-info with title', async () => {
    const location = { name: 'Starbucks', _id: 'abc123' };
    axios.get.mockResolvedValue({ data: location });

    const req = { params: { locationId: 'abc123' } };
    const res = { render: jest.fn() };
    await controllers.locationInfo(req, res);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/locations/abc123');
    expect(res.render).toHaveBeenCalledWith('location-info', expect.objectContaining({
      title: 'Location Info',
      location
    }));
  });

  test('addReview renders location-review-form with title', async () => {
    const location = { name: 'Starbucks', _id: 'abc123' };
    axios.get.mockResolvedValue({ data: location });

    const req = { params: { locationId: 'abc123' } };
    const res = { render: jest.fn() };
    await controllers.addReview(req, res);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/locations/abc123');
    expect(res.render).toHaveBeenCalledWith('location-review-form', expect.objectContaining({
      title: 'Add Review',
      location
    }));
  });

  test('doAddReview posts review and redirects', async () => {
    axios.post.mockResolvedValue({});

    const req = {
      params: { locationId: 'abc123' },
      body: { name: 'John', rating: 5, review: 'Great place!' }
    };
    const res = { redirect: jest.fn() };
    await controllers.doAddReview(req, res);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/locations/abc123/reviews', {
      author: 'John',
      rating: 5,
      reviewText: 'Great place!'
    });
    expect(res.redirect).toHaveBeenCalledWith('/location/abc123');
  });

  test('homeList renders error view on API failure', async () => {
    const err = new Error('Network error');
    axios.get.mockRejectedValue(err);

    const req = {};
    const res = { render: jest.fn() };
    await controllers.homeList(req, res);

    expect(res.render).toHaveBeenCalledWith('error', expect.objectContaining({
      message: 'API lookup error'
    }));
  });

  test('locationInfo renders error view on API failure', async () => {
    axios.get.mockRejectedValue(new Error('Not found'));

    const req = { params: { locationId: 'bad' } };
    const res = { render: jest.fn() };
    await controllers.locationInfo(req, res);

    expect(res.render).toHaveBeenCalledWith('error', expect.objectContaining({
      message: 'API lookup error'
    }));
  });

  test('addReview renders error view on API failure', async () => {
    axios.get.mockRejectedValue(new Error('Not found'));

    const req = { params: { locationId: 'bad' } };
    const res = { render: jest.fn() };
    await controllers.addReview(req, res);

    expect(res.render).toHaveBeenCalledWith('error', expect.objectContaining({
      message: 'API lookup error'
    }));
  });

  test('doAddReview renders error view on API failure', async () => {
    axios.post.mockRejectedValue(new Error('Post failed'));

    const req = {
      params: { locationId: 'bad' },
      body: { name: 'John', rating: 5, review: 'Meh' }
    };
    const res = { render: jest.fn() };
    await controllers.doAddReview(req, res);

    expect(res.render).toHaveBeenCalledWith('error', expect.objectContaining({
      message: 'API lookup error'
    }));
  });
});
