import mongoose from "mongoose";                                //importing mongoose
import bcrypt from "bcrypt";

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

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10)
    }
})
const User = mongoose.model("User",userSchema)                  //Creating a model using the schema 


export default User;
