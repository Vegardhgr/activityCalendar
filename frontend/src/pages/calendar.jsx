import {useContext, useState} from "react";
import MonthlyCalendar from "../components/calendars/monthly/monthlyCalendar";
import SortActivities from "../components/utils/sortActivities";
import CalendarInfoBox from "../components/calendars/calendarInfoBox";
import { ActivitiesContext } from "../components/utils/activitiesContext";

function Calendar({}) {
    const activities = useContext(ActivitiesContext)
    const currentDate = new Date();
    const [clickedDate, setClickedDate] = useState([currentDate.getDate(), currentDate.getMonth()+1, currentDate.getFullYear()]);
    const sortedActivities = SortActivities(activities)

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
                <MonthlyCalendar setClickedDate = {setClickedDate} />
                <CalendarInfoBox year = {year} month = {month} day = {day} sortedActivities = {sortedActivities}/>
            </div>

        </div>
    )
}

export default Calendar;