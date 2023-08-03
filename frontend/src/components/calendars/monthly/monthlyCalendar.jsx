import {useEffect, useState} from "react";
import CountMondays from "./utils/countMondays.jsx";
import './monthlyCalendar.css';
import GetDayCurrentMonth from "./utils/getDayCurrentMonth.jsx";
import GetDayPrevMonth from "./utils/getDayPrevMonth.jsx";
import GetDayNextMonth from "./utils/getDayNextMonth.jsx";

function MonthlyCalendar({setClickedDate, activities}) {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [transitioning, setTransitioning] = useState(false);
    const [showNextMonth, setShowNextMonth] = useState(false);
    const calendarDayBoxWidth = 200;
    const calendarDayBoxPadding = 10;
    const calendarHeight = 135*5 + 75;
    const rowsInMonthArr = CountMondays(currYear, currMonth);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [numberOfDays, setNumberOfDays] = useState(new Date(currYear, currMonth+1, 0).getDate());
    const [monthName, setMonthName] = useState(monthNames[currMonth]);
    useEffect(() => {
        setNumberOfDays(new Date(currYear, currMonth+1, 0).getDate())
        setMonthName(monthNames[currMonth]);

        if (transitioning) {
            setTransitioning(false);
            setShowNextMonth(true);
        }
        }, [transitioning, nextMonth, currYear, currMonth]);

    function prevMonth() {
        if (currMonth===0) {
            setCurrMonth(11);
            setCurrYear(currYear-1);
        } else {
            setCurrMonth(currMonth-1);
        }
        setTransitioning(true);
        }

    function nextMonth() {
        if (currMonth===11) {
            setCurrMonth(0);
            setCurrYear(currYear+1);
        } else {
            setCurrMonth(currMonth+1);
        }
        setTransitioning(true);
    }

    function calendarDayBoxHeightFunc() {
        const calendarDayBoxHeight = (135 / rowsInMonthArr * 5);
        return calendarDayBoxHeight;
    }

    function getActivity(currMonthActivities, i, month) {
        let currActivities = currMonthActivities.filter(activity =>
            new Date(activity.date).getDate() === i &&
            new Date(activity.date).getMonth() === month)
        
        let activityDivs = [];
        for (let j = 0; j < currActivities.length; j++) {
            const keyProp = j;
            activityDivs.push(
                <div key = {keyProp}>
                    <ul>
                        <li>{currActivities[j].title}</li>
                    </ul>
                </div>
            )
        }
        return activityDivs;
    }

    const calendarTable = ()=> {
        const dayNameArrayDivs = [];
        let monthArr = [];
        let weekArr = [];
        let rowIndex = 0; 
        
        const animationClass = transitioning ? 
            'opacity-out' : showNextMonth ? 
                'opacity-in' : 'opacity-out';
            
        const currMonthActivities = activities.filter(element => 
                new Date(element.date).getMonth() >= currMonth-1 &&
                new Date(element.date).getMonth() <= currMonth+1 &&
                new Date(element.date).getFullYear() === currYear
        )

        const dayNameArray = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

        for (let i = 1; i <= dayNameArray.length; i++) {
            const keyProp = i;
            dayNameArrayDivs.push(
                <div key = {keyProp} 
                    style={{display:"inline-flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    width: calendarDayBoxWidth, 
                    height: 30}}>
                        {dayNameArray[i%7]}
                </div>)
        }

        for (let i = 1; i<=numberOfDays; i++) {
            const filteredActivities = currMonthActivities.filter(activity =>
                new Date(activity.date).getDate() === i &&
                new Date(activity.date).getMonth() === currMonth
            );


            const dayBox = 
                GetDayCurrentMonth(i, setClickedDate, currMonth, currYear, calendarDayBoxHeightFunc, getActivity, 
                    currMonthActivities, filteredActivities, monthNames, calendarDayBoxWidth, calendarDayBoxPadding, monthArr)
            
                            
            /*Fills in empty space at the beginning of the calendar, if any,
              with dates from the previous month*/
            if (i === 1) {
                const dayDivsInPrevMonth = GetDayPrevMonth(setClickedDate, currYear, currMonth, calendarDayBoxWidth,
                        calendarDayBoxHeightFunc, calendarDayBoxPadding, getActivity, currMonthActivities)  
                for (var j = 0; j < dayDivsInPrevMonth.length; j++) {
                    weekArr.push(dayDivsInPrevMonth[j]) 
                }
            }
            weekArr.push(dayBox);

            /*Fills in empty space, if any, at the end of the calendar, with dates from the next month*/
            if (i === numberOfDays || weekArr.length%7 === 0) {
                monthArr.push(
                    <div key = {rowIndex} style = {{display: "flex"}}>
                        {weekArr}
                    </div>
                )            
                if (i === numberOfDays) {
                    const dayDivsInNextMonth = (
                        GetDayNextMonth(i, setClickedDate, currYear, currMonth, calendarDayBoxWidth,
                            calendarDayBoxHeightFunc, calendarDayBoxPadding, getActivity, monthNames, weekArr,
                            currMonthActivities)
                    );
                    for (var j = 0; j < dayDivsInNextMonth.length; j++) {
                        weekArr.push(dayDivsInNextMonth[j])
                    } 
                }
            
                rowIndex++;
                weekArr = [];
            }
        }
        



    return (
        <div>
            <div style={{ width: "fit-content" }}>
                <div style={{ height: calendarHeight + "px", padding: "10 px", backgroundColor: "#b3f2b3" }}>
                    <div className="mb-2" style={{ display: "flex" }}>
                        <div className="d-flex">
                            <div onClick={prevMonth}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="" className="bi bi-caret-left" viewBox="0 0 16 16">
                                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                </svg>
                            </div>
                            <div onClick={nextMonth}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="" className="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h4>{monthName} {currYear}</h4>
                        </div>
                        
                    </div>
                    {dayNameArrayDivs}
                    <div 
                    className={`calendar-day-box ${animationClass}
                        ${transitioning ? "slide-opacity" : ""}`} 
                    style={{ backgroundColor: "#eeeeee" }}>
                        {monthArr}
                    </div>
                </div>
            </div>
        </div>
    );}
    return calendarTable();   
}

export default MonthlyCalendar;