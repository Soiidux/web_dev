export const UserRolesEnum = {
    ADMIN:"admin",
    PROJECT_ADMIN:"project_admin",
    MEMBER:"member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum);


export const ProjectStatusEnum = {
    TODO:"todo",
    IN_PROGRESS:"in_progress",
    DONE:"done"
}

export const AvailableProjectStatus = Object.values(ProjectStatusEnum);