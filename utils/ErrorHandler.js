class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports.ExpressError = ExpressError;

function catchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports.catchAsync = catchAsync;

function errorHandler(err, req, res, next) {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status);

    res.render('main/error', {message, status});
    next();
}

module.exports.errorHandler = errorHandler;