import jwt from "jsonwebtoken"

export const isLoggedIn = async (req,res,next) => {
    //get token from cookie
    //check if token is valid
    //get data from token
    try {
        let token = req.cookies?.token
        if(!token){
            return res.status(401).json({
                success: false,
                message:"Authentication failed"
            })
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal sever error"
        })
    }
    next()
}