import ActivityCard from "../components/cards/activityCard";

function UpcomingActivities({ activities }) {
    const defaultActivities = [
        {
            title: "Rustadsaga",
            description: "Tur til Rustadsaga",
            time: "09:00",
            date: "07/16/2023",
            repeat: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }
        }, 
        {
            title: "Sarabråten",
            description: "Tur til Sarabråten",
            time: "10:00",
            date: "07/17/2023",
            repeat: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }
        }
    ]


    activities = [...activities, ...defaultActivities];

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