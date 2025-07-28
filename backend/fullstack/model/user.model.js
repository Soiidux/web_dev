import mongoose from "mongoose";                                //importing mongoose


const userSchema = new mongoose.Schema({                        //Creating a new schema 
    name : String,
    email: String,
    password : String,
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpires : {
        type : Date
    }

} , {
    timestamps : true
})                       

const user = mongoose.model("User",userSchema)                  //Creating a model using the schema 


export default user
