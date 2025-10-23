import mongoose from "mongoose";

const projectNoteSchema = mongoose.Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    content : {
        type : String,
        required : true
    }


},{timestamps:true})

export const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);