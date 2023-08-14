function CalendarInfoBox({year, month, day, sortedActivities}) {
    return (
        <div style={{padding: "10px", marginTop: "66px", overflow: "scroll", width:"250px", height:135*5+1 + "px", backgroundColor:"white", border: "solid"}}>
            <h4 className="d-flex mb-3"><b>Dato: <u>{day} {month} {year}</u></b></h4>
            {sortedActivities.map((activity, index) => {
                let activityDate = new Date(activity.date);
                let activityDay = (activityDate.getDate()).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                })
                let activityMonth = (activityDate.getMonth()+1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                })
                if (activityDay === day && 
                    activityMonth === month && 
                    activityDate.getFullYear() === year) {
                    return (
                        <div key = {index} className = "mb-5">
                            <h4>Kl. {activity.time} {activity.title}</h4>
                            <p>{activity.description}</p>
                        </div>
                    )
                }                 
            })}
        </div>
    )
}

export default CalendarInfoBox;