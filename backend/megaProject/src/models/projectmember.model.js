import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";

const projectMembersSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    role : {
        type : String,
        enum : AvailableUserRoles,
        default : UserRolesEnum.MEMBER
    }
})

export const ProjectMember = mongoose.model("ProjectMember", projectMembersSchema);