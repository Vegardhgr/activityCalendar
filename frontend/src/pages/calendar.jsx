import {useEffect, useRef, useState} from "react";
import MonthlyCalendar from "../components/calendars/monthly/monthlyCalendar";
import SortActivities from "../components/utils/sortActivities";

function Calendar({activities}) {
    const currentDate = new Date();
    const [clickedDate, setClickedDate] = useState([currentDate.getDate(), currentDate.getMonth()+1, currentDate.getFullYear()]);
    const sortedActivities = SortActivities({activityArray: activities})

    let day = clickedDate[0];
    day = day.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

    let month = clickedDate[1];
    month = month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    const year = clickedDate[2];

    return (
        <div> 
            <div className="mt-2 d-flex justify-content-center">
                <MonthlyCalendar setClickedDate = {setClickedDate} activities = {activities}/>
                <div style={{marginTop: "75px", overflow: "scroll", width:"250px", height:125*6 + "px", backgroundColor:"white", border: "solid"}}>
                    <h4 className="d-flex mb-3"><b>Dato: <u>{day} {month} {year}</u></b></h4>
                    {sortedActivities.map(activity => {
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
                                <div className = "mb-5">
                                    <h4>Kl. {activity.time} {activity.title}</h4>
                                    <p>{activity.description}</p>
                                </div>
                            )
                            
                        }                 
                    })}
                </div>
            </div>

        </div>
    )
}

export default Calendar;