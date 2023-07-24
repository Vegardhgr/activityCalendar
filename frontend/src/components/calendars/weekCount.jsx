function WeekCount(year, monthNumber) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, monthNumber-1, 1);
    var lastOfMonth = new Date(year, monthNumber, 0);

    var used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}

export default WeekCount;