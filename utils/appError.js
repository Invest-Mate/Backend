class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        //Operational errors are made true

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;

//If we want to introduce any operational error then we use this and it will call
//the global error handling code