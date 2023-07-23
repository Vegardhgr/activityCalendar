import ActivityCard from "../components/cards/activityCard";

function UpcomingActivities({ activities }) {
    return (
        <div className = "row justify-content-center ">
            <div className = "col-md-8">
                <h2><u>Kommende aktiviteter</u></h2>    
                    {activities.map(activity =>
                        <ActivityCard time = {activity.time} date = {activity.date}>
                            <h5 class="card-title"><b>{activity.title}</b></h5>
                            <p class="card-text">{activity.description}</p>
                        </ActivityCard>
                    )}
            </div>
        </div>
    );
}

export default UpcomingActivities;