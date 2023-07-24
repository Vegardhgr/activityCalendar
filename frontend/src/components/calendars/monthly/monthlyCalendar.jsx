import {useEffect, useRef, useState} from "react";
import WeekCount from '../weekCount.jsx';
import CountMondays from "./utils/countMondays.jsx";

function MonthlyCalendar({setClickedDate, activities}) {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const calendarDayBoxWidth = 160;
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
    }, [currYear, currMonth]);

    function prevMonth() {
        if (currMonth===0) {
            setCurrMonth(11);
            setCurrYear(currYear-1);
        } else {
            setCurrMonth(currMonth-1);
        }
    }

    function nextMonth() {
        if (currMonth===11) {
            setCurrMonth(0);
            setCurrYear(currYear+1);
        } else {
            setCurrMonth(currMonth+1);
        }
    }

    function calendarDayBoxHeightFunc() {
        const calendarDayBoxHeight = (135 / rowsInMonthArr * 5);
        return calendarDayBoxHeight;
    }

    function getActivity(currMonthActivities, i) {
        
        let currActivities = currMonthActivities.filter(activity =>
            new Date(activity.date).getDate() === i)
        
        let activityDivs = [];
        for (let j = 0; j < currActivities.length; j++) {
            activityDivs.push(
                <div className = "">
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
                
        const currMonthActivities = activities.filter(element => 
                new Date(element.date).getMonth() === currMonth &&
                new Date(element.date).getFullYear() === currYear
        )

        const dayNameArray = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

        for (let i = 1; i <= dayNameArray.length; i++) {
            dayNameArrayDivs.push(
                <div style={{display:"inline-flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    width: calendarDayBoxWidth, 
                    height: 30}}>
                        {dayNameArray[i%7]}
                </div>)
        }

        for (let i = 1; i<=numberOfDays; i++) {
            const dayBox = (
                <div key = {i} onClick={() => setClickedDate([i, currMonth+1, currYear])}
                    style={{backgroundColor: "#eeeeee",
                    width: calendarDayBoxWidth+"px", 
                    height: calendarDayBoxHeightFunc()+"px",
                    padding: calendarDayBoxPadding+"px",
                    borderBottomStyle: "solid",
                    borderLeftStyle: "solid",
                    borderRightStyle: i === numberOfDays ? "solid" : "",
                    borderTopStyle: i <= 7 ? "solid" : "",
                    borderWidth:"thin",
                    overflow: "scroll"
                    }}>
                        <div className = "mb-2">{i}. {dayNameArray[new Date(currYear, currMonth, i).getDay()]}</div>
                        <div>
                            <u>{currMonthActivities.filter(activity =>
                            new Date(activity.date).getDate() === i).length} aktiviteter:</u>
                        </div>    
                        <div>
                            {getActivity(currMonthActivities, i)}
                        </div>

                </div>
            );

            const keyGenerator = (j) => j*100;
            const emptyDiv = (j) => (
                <div key = {keyGenerator(j)}
                style={{backgroundColor: "#b3f2b3",
                width: calendarDayBoxWidth+"px", 
                height: calendarDayBoxHeightFunc()+"px",
                }}></div>)
                
                if (i === 1) {
                    for (let j = 0; j < ((new Date(currYear, currMonth, i).getDay()+6)%7); j++) {
                        weekArr.push(emptyDiv(i - j)); // Fix the indexing
                    }
                }
                weekArr.push(dayBox);
           
            if (i === numberOfDays || weekArr.length%7 === 0) {
                monthArr.push(
                    <div key = {rowIndex} style = {{display: "flex"}}>
                        {weekArr}
                    </div>
                )
                for (let j = weekArr.length; j % 7 !== 0; j++) {
                    weekArr.push(emptyDiv);
                }
                rowIndex++;
                weekArr = [];
            }
        }
        return( 
            <div className = "">
                <div style = {{width: "fit-content"}}>
                    <div style = {{height: calendarHeight+"px", padding: "10 px", backgroundColor: "#b3f2b3"}}>
                        <div className = "mb-2" style={{ display: "flex"}}>
                            <div className = "d-flex">
                                <div onClick={prevMonth}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                                        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                    </svg>
                                </div>
                                <div onClick={nextMonth}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h4>{monthName} {currYear}</h4>
                            </div>
                            
                        </div>
                        {dayNameArrayDivs}
                        {monthArr}
                    </div>
                    
                </div>
            </div>
        );
    }
    return calendarTable();   
}

export default MonthlyCalendar;