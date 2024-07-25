type GroupType = {
    name: string
    profile_pic: string,
    admin: string[],
    users: string[],
    pending_request: string[],
    "is_notification_triggered": boolean,
    "created_at": Date,
    "updated_at": Date
}

export default GroupType;
