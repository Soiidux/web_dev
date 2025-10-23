import ApiResponse from "../utils/api-responses.js";
import {PORT} from "../utils/env_constants.js";
const healthCheck = (req,res)=>{
    res.status(200).json(
        new ApiResponse(200,{message:`Server is running on port ${PORT}`})
    )
}

export {healthCheck}