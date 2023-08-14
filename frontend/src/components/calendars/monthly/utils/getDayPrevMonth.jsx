function GetDayPrevMonth(setClickedDate, currYear, currMonth, calendarDayBoxWidth,
    calendarDayBoxHeightFunc, calendarDayBoxPadding, getActivity, currMonthActivities) {

    const dateToday = new Date()

    function isDateToday(j) {
        const dateToValidate = new Date(currYear, currMonth, 1-j)

        if (dateToday.getFullYear() === dateToValidate.getFullYear() 
        && dateToday.getMonth() === dateToValidate.getMonth()
        && dateToday.getDate() === dateToValidate.getDate()) {
            return true;
        }
        return false;
    }

    let daysInPreviousMonthArr = [];
    const i = 1;
    for (let j = ((new Date(currYear, currMonth, i).getDay()+6)%7); j > 0; j--) {
        const filteredActivitiesPrevMonth = currMonthActivities.filter(activity =>
            new Date(activity.date).getDate() ===
            new Date(currYear, currMonth, 1-j).getDate()
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
                    <div className = "mb-1 d-flex justify-content-center">
                        {isDateToday(j) ? (
                            <span className = "d-flex justify-content-center" style = {{width: "22px", borderRadius: "100%", backgroundColor: "lightgray"}}>
                                {new Date(currYear, currMonth, 1-j).getDate()}
                            </span>
                        ) : ( 
                            <span>
                                {new Date(currYear, currMonth, 1-j).getDate()}
                            </span>
                        )}
                       
                    </div>
                    <div className = "d-flex justify-content-center" style = {{borderRadius:"10px", backgroundColor: "lightgray"}}>
                        {filteredActivitiesPrevMonth.length > 0 ? 
                            <u>{filteredActivitiesPrevMonth.length} aktiviteter:</u> : ""}
                    </div>    
                    <div>
                        {getActivity(filteredActivitiesPrevMonth, new Date(currYear, currMonth, 1-j).getDate(), currMonth-1)}
                    </div>
            </div>
        )

        daysInPreviousMonthArr.push(dayInPrevMonth);
    }

    return daysInPreviousMonthArr;
}

export default GetDayPrevMonth;