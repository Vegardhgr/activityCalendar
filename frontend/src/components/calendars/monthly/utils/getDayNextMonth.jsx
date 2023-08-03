function GetDayNextMonth(i, setClickedDate, currYear, currMonth, calendarDayBoxWidth,
    calendarDayBoxHeightFunc, calendarDayBoxPadding, getActivity, monthNames, weekArr,
    currMonthActivities) {
        let dayInNextMonthCounter = 0;
        let daysInNextMonthArr = [];
        for (let j = weekArr.length; j % 7 !== 0; j++) {
            dayInNextMonthCounter += 1;
            const filteredActivitiesNextMonth = currMonthActivities.filter(activity =>
                new Date(activity.date).getMonth() === currMonth+1 &&
                new Date(activity.date).getDate() === new Date(currYear,currMonth+1,dayInNextMonthCounter).getDate()
            )
            const divKey = i+j+10
            const day = new Date(currYear, currMonth+1,1).getDate()+dayInNextMonthCounter-1
            const dayInNextMonth = (
                <div key = {divKey} onClick={() => setClickedDate([day, currMonth+2, currYear])}
                    style={{backgroundColor: "#eeeeee",
                    width: calendarDayBoxWidth+"px", 
                    height: calendarDayBoxHeightFunc()+"px",
                    padding: calendarDayBoxPadding+"px",
                    borderLeftStyle: "solid",
                    borderTopStyle: i <= 7 ? "solid" : "",
                    borderBottomStyle: "solid",
                    borderWidth:"thin",
                    overflow: "scroll"
                    }}>
                        <div className = "mb-2 d-flex justify-content-center">
                            {new Date(currYear, currMonth+1, new Date(currYear, currMonth+1, dayInNextMonthCounter).getDate()).getDate()} 
                            {new Date(currYear, currMonth+1, new Date(currYear, currMonth+1, dayInNextMonthCounter).getDate()).getDate()===1 ?
                            currMonth === 11 ? ". " + monthNames[new Date(currYear+1, 0, i).getMonth() ] :
                            ". " + monthNames[new Date(currYear, currMonth+1, 1).getMonth()] : ""}
                        </div>
                        <div style = {{backgroundColor:"lightgray"}}>
                            {filteredActivitiesNextMonth.length > 0 ? 
                            <u>{filteredActivitiesNextMonth.length} aktiviteter:</u> : ""}
                        </div>
                        <div>
                            {getActivity(filteredActivitiesNextMonth, new Date(currYear, currMonth+1, (new Date(currYear, currMonth+1, 1).getDate() + dayInNextMonthCounter-1)).getDate(), currMonth+1)}
                        </div> 
                </div>
            )
            daysInNextMonthArr.push(dayInNextMonth)
    }
    return daysInNextMonthArr
}

export default GetDayNextMonth;