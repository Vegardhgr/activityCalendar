import {useEffect, useRef, useState} from "react";
import Button from '../../utils/button';

function MonthlyCalendar({setClickedDate, activities}) {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const calendarDayBoxHeight = 125;
    const calendarDayBoxWidth = 125;
    const calendarHeight = calendarDayBoxHeight*6 + 75;
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

    const calendarTable = ()=> {
        const monthArr = [];
        const dayNameArrayDivs = [];
        let weekArr = [];
        let rowIndex = 0;   
        
        const currMonthActivities = activities.filter(element => 
            new Date(element.date).getMonth() === currMonth
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
                    height: calendarDayBoxHeight+"px",
                    borderBottomStyle: "solid",
                    borderLeftStyle: "solid",
                    borderRightStyle: i === numberOfDays ? "solid" : "",
                    borderTopStyle: i <= 7 ? "solid" : "",
                    borderWidth:"thin"
                    }}>
                        <div className = "mb-2">{i}. {dayNameArray[new Date(currYear, currMonth, i).getDay()]}</div>
                        <div>{currMonthActivities.filter(activity =>
                            new Date(activity.date).getDate() === i).length} aktiviteter</div>                                   
                </div>
            );

            const keyGenerator = (j) => j*100;
            const emptyDiv = (j) => (
                <div key = {keyGenerator(j)}
                style={{backgroundColor: "#b3f2b3",
                width: calendarDayBoxWidth+"px", 
                height: calendarDayBoxHeight+"px",
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
                        <div className = "mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                            {<Button onClick={prevMonth} buttonText={"Forrige"}/>}
                            <div>
                                <h4>{monthName} {currYear}</h4>
                            </div>
                            {<Button onClick={nextMonth} style = {{marginLeft: "auto", float: "right"}} buttonText={"Neste"}/>}
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