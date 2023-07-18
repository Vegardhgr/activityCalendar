import {useEffect, useRef, useState} from "react";
import Button from '../components/utils/button';

function Calendar() {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const calendarDayBoxHeight = 120;
    const calendarDayBoxWidth = 120;
    const marginBetweenEachBox = 10;
    const calendarHeight = (calendarDayBoxHeight + marginBetweenEachBox)*5 + 60;
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
        const tableArr = [];
        let row = [];
        let rowIndex = 0;        

        for (var i = 1; i<=numberOfDays; i++) {
            row.push(
                <div key = {i} style={{backgroundColor: "#eeeeee", width: calendarDayBoxWidth+"px", height: calendarDayBoxHeight+"px", marginRight: marginBetweenEachBox+"px", marginBottom: "10px", border: "solid"}}>{i}</div>
            );
            if (i % 7 === 0) {
                tableArr.push(
                    <div key = {rowIndex} style = {{display: "flex"}}>
                        {row}
                    </div>
                )
                rowIndex++;
                row = [];
              }
            if (i === numberOfDays && i%7 !== 0) {
                tableArr.push(
                    <div key = {rowIndex} style = {{display: "flex"}}>
                        {row}
                    </div>
                )
                rowIndex++;
                row = [];
            }
        }
        return(
            <div className = "mt-2 d-flex justify-content-center">
                <div style = {{width: "fit-content"}}>
                    <div style = {{height: calendarHeight+"px", padding: "10px", backgroundColor: "lightGreen"}}>
                        <div className = "mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                            {<Button onClick={prevMonth} buttonText={"Previous"}/>}
                            <div>
                                <h4>{monthName} {currYear}</h4>
                            </div>
                            {<Button onClick={nextMonth} style = {{marginLeft: "auto", float: "right"}} buttonText={"Next"}/>}
                        </div>
                        {tableArr}
                    </div>
                    
                </div>
            </div>
        );
    }
    
    return calendarTable();
}

export default Calendar;