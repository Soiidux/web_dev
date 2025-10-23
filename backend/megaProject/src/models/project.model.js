import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    description : {
        type : String,
    }
},{timestamps:true})

export const Project = mongoose.model("Project", projectSchema);