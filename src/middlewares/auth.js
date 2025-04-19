
import jwt from 'jsonwebtoken'
import { User } from '../models/users.model.js'
import thorwIf from '../utils/throwif.js'
import asyncHandler from '../utils/asyncHandler.js'



export const protect = asyncHandler(async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    thorwIf(!token,401, "Unauthorized");
    const decode = jwt.verify(token,process.env.JWT_SECRET) 
    const user = await User.findById(decode.userId);
    thorwIf(!user, 401, "User Not Found");

    req.user = user;
    next();
})
