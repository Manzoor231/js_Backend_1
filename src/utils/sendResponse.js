import ApiResponse from "./ApiResponse.js";

const sendResponse = (res, statusCode, message, data) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data));
};


export default sendResponse;
