const { errorHandler, catchAsync } = require('../ErrorHandler');

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

describe('catchAsync Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {}; // Mock request object
        res = {}; // Mock response object
        next = jest.fn(); // Mock next function
    });

    it('should call the handler successfully', async () => {
        const mockHandler = jest.fn(async (req, res, next) => {
            res.data = 'Success'; // Simulate setting a response value
        });

        const middleware = catchAsync(mockHandler);

        await middleware(req, res, next);

        expect(mockHandler).toHaveBeenCalledWith(req, res, next); // Ensure the handler was called
        expect(res.data).toBe('Success'); // Ensure the handler executed properly
        expect(next).not.toHaveBeenCalled(); // Ensure `next` wasn't called with an error
    });

    it('should catch errors and pass them to next', async () => {
        const mockError = new Error('Test Error');
        const mockHandler = jest.fn(async () => {
            throw mockError; // Simulate an error in the handler
        });

        const middleware = catchAsync(mockHandler);

        await middleware(req, res, next);

        expect(mockHandler).toHaveBeenCalledWith(req, res, next); // Ensure the handler was called
        expect(next).toHaveBeenCalledWith(mockError); // Ensure `next` was called with the error
    });
});