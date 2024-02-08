const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    // change req succeeded code to generic server error code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check for bad Mongoose ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 400;
    };

    res.status(statusCode).json({
        message, 
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export { notFound, errorHandler };