
import constants from "../constants.js"

const errorHandler = (err, req, res, next) => {
    //Kiểm tra xem trạng thái đang là bao nhiều? nếu có thì sẽ là trạng thái của res.statusCode 
    //còn không thì sẽ là 500 

    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            })
        case constants.UN_AUTHORIZED:
            res.json({
                title: "Validation UN_AUTHORIZED",
                message: err.message,
                stackTrace: err.stack
            })
        case constants.FORBIDDEN:
            res.json({
                title: "Validation FORBIDDEN",
                message: err.message,
                stackTrace: err.stack
            })
        case constants.NOT_FOUND:
            res.json({
                title: "Validation NOT_FOUND",
                message: err.message,
                stackTrace: err.stack
            })
        default:
            console.log("No Error,All good!");
            break;
    }

}

export default errorHandler;