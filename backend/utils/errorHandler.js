class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode= statusCode;

        Error.captureStackTrace(this, this.constuctor);
    }
}
export default ErrorHandler;