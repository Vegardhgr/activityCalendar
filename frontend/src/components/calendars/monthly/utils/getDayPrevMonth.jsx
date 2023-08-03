function GetDayPrevMonth(setClickedDate, currYear, currMonth, calendarDayBoxWidth,
    calendarDayBoxHeightFunc, calendarDayBoxPadding, getActivity, currMonthActivities) {

        let daysInPreviousMonthArr = [];
        const i = 1;
        for (let j = ((new Date(currYear, currMonth, i).getDay()+6)%7); j > 0; j--) {
            const filteredActivitiesPrevMonth = currMonthActivities.filter(activity =>
                new Date(activity.date).getDate() ===
                new Date(currYear, currMonth, new Date(currYear, currMonth, 1).getDate() - j).getDate()
                &&
                new Date(activity.date).getMonth() === currMonth-1
            )
            const divKey = i-j

    const dayInPrevMonth = (
        <div key = {divKey} onClick={() => setClickedDate([new Date(currYear, currMonth, 0).getDate()-j+1, currMonth, currYear])}
                            style={{backgroundColor: "#eeeeee",
                            width: calendarDayBoxWidth+"px", 
                            height: calendarDayBoxHeightFunc()+"px",
                            padding: calendarDayBoxPadding+"px",
                            borderBottomStyle: "solid",
                            borderLeftStyle: "solid",
                            borderTopStyle: "solid",
                            borderWidth:"thin",
                            overflow: "scroll"
                            }}>
                                <div className = "mb-2 d-flex justify-content-center">
                                    {new Date(currYear, currMonth, new Date(currYear, currMonth, 1).getDate() - j).getDate()}
                                </div>
                                <div style = {{backgroundColor: "lightgray"}}>
                                    {filteredActivitiesPrevMonth.length > 0 ? 
                                        <u>{filteredActivitiesPrevMonth.length} aktiviteter:</u> : ""}
                                </div>    
                                <div>
                                    {getActivity(filteredActivitiesPrevMonth, new Date(currYear, currMonth, (new Date(currYear, currMonth, 1).getDate() - j)).getDate(), currMonth-1)}
                                </div>
                        </div>
    )

    daysInPreviousMonthArr.push(dayInPrevMonth);
    }

    return daysInPreviousMonthArr;
}

export default GetDayPrevMonth;