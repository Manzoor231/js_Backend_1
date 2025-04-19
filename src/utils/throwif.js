import ApiError from "./ApiError.js"

const thorwIf = (condition, statusCode, message ) =>{
    if(condition) throw new ApiError(statusCode, message)
}

export default thorwIf;