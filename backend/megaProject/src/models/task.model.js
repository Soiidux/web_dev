import mongoose from "mongoose";
import { AvailableProjectStatus , ProjectStatusEnum } from "../utils/constants";
const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    description : {
        type : String,
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    status : {
        type : String,
        enum : AvailableProjectStatus,
        default : ProjectStatusEnum.TODO
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    assignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    attachments : {
        type : [
            {
                url : String,
                mimetype : String,
                size : Number
            }
        ],
        default : []
    }
},{timestamps:true})

export const Task = mongoose.model("Task", taskSchema);