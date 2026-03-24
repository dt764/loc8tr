const controller = require('../../controllers/locations');

describe('controllers/locations', () => {
  test('sendJsonResponse sets status and json', () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    controller.sendJsonResponse(res, 200, { message: 'ok' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'ok' });
  });

  test('exports basic CRUD handlers', () => {
    expect(typeof controller.locationsListByDistance).toBe('function');
    expect(typeof controller.locationsCreate).toBe('function');
    expect(typeof controller.locationsReadOne).toBe('function');
    expect(typeof controller.locationsUpdateOne).toBe('function');
    expect(typeof controller.locationsDeleteOne).toBe('function');
  });
});