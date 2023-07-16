function UpcomingActivities({ activities }) {
    return (
        <div>{activities.map(activity =>
            activity.title)}</div>
    );
}

export default UpcomingActivities;