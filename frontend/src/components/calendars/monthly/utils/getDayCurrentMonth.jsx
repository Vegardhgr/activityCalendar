function GetDayCurrentMonth(i, setClickedDate, currMonth, currYear, calendarDayBoxHeightFunc, getActivity, 
    currMonthActivities, filteredActivities, monthNames, calendarDayBoxWidth, calendarDayBoxPadding, monthArr) {
    const dayInCurrentMonth = (
        <div key = {i} onClick={() => setClickedDate([i, currMonth+1, currYear])}
            style={{backgroundColor: "#eeeeee",
            width: calendarDayBoxWidth+"px", 
            height: calendarDayBoxHeightFunc()+"px",
            padding: calendarDayBoxPadding+"px",
            borderBottomStyle: "solid",
            borderLeftStyle: "solid",
            borderTopStyle: monthArr.length === 0 ? "solid" : "", //First row (week) in the calendar
            borderWidth:"thin",
            overflow: "scroll"
        }}>
            <div className = "mb-2 d-flex justify-content-center">
                <b>
                    {i}{i===1 ? ". " + monthNames[new Date(currYear, currMonth, i).getMonth()] : ""}
                </b>
            </div>
            <div style = {{backgroundColor: "lightgreen"}} >
                {filteredActivities.length > 0 ? 
                    <u>{filteredActivities.length} aktiviteter:</u> : ""}
            </div>    
            <div>
                {getActivity(currMonthActivities, i, currMonth)}
            </div>
        </div>
    )
    return dayInCurrentMonth;
}

export default GetDayCurrentMonth;