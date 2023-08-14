function CheckExpiredActivity(dateExpired, activityDate) {
    activityDate = new Date(activityDate);
    if (dateExpired === "" || new Date(dateExpired) > activityDate) {
        /*The activity has not yet expired*/
        return true;
    }
    return false;
}

export default CheckExpiredActivity