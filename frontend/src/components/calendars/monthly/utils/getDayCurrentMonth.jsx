function GetDayCurrentMonth(i, setClickedDate, currMonth, currYear, calendarDayBoxHeightFunc, getActivity, 
    monthNames, calendarDayBoxWidth, calendarDayBoxPadding, monthArr) {    

    const dateToday = new Date()

    function isDateToday() {
        if (dateToday.getFullYear() === currYear 
        && dateToday.getMonth() === currMonth
        && dateToday.getDate() === i) {
            return true;
        }
        return false;
    }

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
            <div className = "mb-1 d-flex justify-content-center">
                <b>
                    {isDateToday() ? (
                        <span className = "d-flex justify-content-center" style = {{width: "22px", borderRadius: "100%", backgroundColor: "#779fdd"}}>
                            {i}
                        </span>
                    ) : (
                        <span>
                            {i}
                        </span>
                    )}
                    {i===1 ? ". " + monthNames[new Date(currYear, currMonth, i).getMonth()] : ""}
                </b>
            </div>
            <div style = {{borderRadius:"10px", backgroundColor: "#779fdd"}} >
                <div className = "d-flex justify-content-center">
                    {getActivity.length > 0 ? 
                        <u>{getActivity.length} aktiviteter:</u> : ""}
                </div>
            </div>    
            <div>
                {getActivity}
            </div>
        </div>
    )
    return dayInCurrentMonth;
}

export default GetDayCurrentMonth;