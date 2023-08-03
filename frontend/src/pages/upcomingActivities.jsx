import ActivityCard from "../components/cards/activityCard";
import SortActivities from "../components/utils/sortActivities";

function UpcomingActivities({ activities }) {
    const timeNow = new Date();
    let sortedActivities = SortActivities({activityArray: activities})

    /*Filtering for upcomming activities*/
    sortedActivities = sortedActivities.filter(activity => {
        const activityDate = new Date(activity.date);
        return (
            activityDate.getFullYear() > timeNow.getFullYear() ||
            (activityDate.getFullYear() === timeNow.getFullYear() &&
              activityDate.getMonth() > timeNow.getMonth()) ||
            (activityDate.getFullYear() === timeNow.getFullYear() &&
              activityDate.getMonth() === timeNow.getMonth() &&
              activityDate.getDate() >= timeNow.getDate())
          );
    });

    return (
        <div className = "row justify-content-center ">
            <div className = "col-md-8">
                <h2><u>Kommende aktiviteter</u></h2>    
                    {sortedActivities.length !== 0 ? 
                        sortedActivities.map(activity =>
                            <ActivityCard time = {activity.time} date = {activity.date}>
                                <h5 class="card-title"><b>{activity.title}</b></h5>
                                <p class="card-text">{activity.description}</p>
                            </ActivityCard>
                        ) : <div><h4>Foreløpig ingen kommende aktiviteter</h4></div>
                    }
            </div>
        </div>
    );
}

export default UpcomingActivities;