import ActivityCard from "../components/cards/activityCard";
import SortActivities from "../components/utils/sortActivities";

function UpcomingActivities({ activities }) {
    const timeNow = new Date();
    
    let sortedActivities = SortActivities({activityArray: activities})

    /*Filtering for upcomming activities*/
    const upCommingActivities = sortedActivities.filter(activity => {
        const activityDate = new Date(activity.date);
        return (
            activityDate >= timeNow
        );
    });

    function getUpCommingActivityCards() {
        const upCommingActivityCards = (
            upCommingActivities.map((activity, index) =>
                <ActivityCard key = {index} activity = {activity}>
                    <h5 key={activity.id} className="card-title"><b>{activity.title}</b></h5>
                    <p className="card-text">{activity.description}</p>
                </ActivityCard>
            )
        )
        return upCommingActivityCards
    }

    var activityCards = getUpCommingActivityCards();

    

    return (
        <div className = "row justify-content-center ">
            <div className = "col-md-8">
                <h2><u>Kommende aktiviteter</u></h2>    
                {activityCards.length !== 0 ? 
                    activityCards
                    : <div><h4>Foreløpig ingen kommende aktiviteter</h4></div>
                }
            </div>
        </div>
    );
}

export default UpcomingActivities;