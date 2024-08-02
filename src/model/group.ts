type GroupType = {
    name: string
    profileImage: string,
    admin: string[],
    users: string[],
    pendingRequest: string[],
    "isNotificationTriggered": boolean,
    "createdAt": Date,
    "updatedAt": Date
}

export default GroupType;
