import {useState} from "react";
import MonthlyCalendar from "../components/calendars/monthly/monthlyCalendar";
import SortActivities from "../components/utils/sortActivities";
import CalendarInfoBox from "../components/calendars/calendarInfoBox";

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
                <CalendarInfoBox year = {year} month = {month} day = {day} sortedActivities = {sortedActivities}/>
            </div>

        </div>
    )
}

export default Calendar;