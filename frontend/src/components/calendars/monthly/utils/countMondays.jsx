function CountMondays(year, month) {
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let mondays = 0;
    for (let i = 1; i <= daysInMonth; i++) {
        if (mondays===0 || new Date(year, month, i).getDay() === 1) {
            mondays += 1;
        }
    }
    return mondays;
}

export default CountMondays;