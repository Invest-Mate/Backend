export default fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

//This function is used to Control async-await errors
//With this block of code we will get rid of writing try-catch block

//This catchAsync will call the global error handling code