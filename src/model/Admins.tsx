export enum AdminType {
    none = "none",
    admin = "admin",
    superAdmin = "super-admin"
}

export function translateToAdminType(str:string) : AdminType {
    if(str === "admin") {
        return AdminType.admin
    }
    else if(str === "super-admin") {
        return AdminType.superAdmin
    }

    return AdminType.none;
}

export interface AdminCreate {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    type: AdminType;
}

export interface Admin {
    id: string,
    createdBy: string,
    email: string,
    type: string,
    username: string,
    phoneNumber: string,
    state: string,
}