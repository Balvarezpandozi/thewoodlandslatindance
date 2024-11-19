const { errorHandler } = require('../ErrorHandler');

describe('test Error Hanlder', () => {
    it('should return default values', () => {
        let err = {}
        let req = {}
        let res = {
            status: jest.fn(),
            render: jest.fn(),
        }
        let next = jest.fn();

        errorHandler(err, req, res, next);
        expect(res.render).toHaveBeenCalledWith('main/error', {'message': 'Something went wrong', 'status': 500});
    });
});