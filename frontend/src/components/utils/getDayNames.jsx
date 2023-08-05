function GetDayName({language, capitalLetter}) {
    const dayNamesEngCapital = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNamesEng = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayNamesNorCapital = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    const dayNamesNor = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];

    if (language === "eng" && capitalLetter === false) {
        return dayNamesEng
    } else if (language === "eng" && capitalLetter === true) {
        return dayNamesEngCapital
    } else if (language === "nor" && capitalLetter === true) {
        return dayNamesNorCapital;
    } else {
        return dayNamesNor
    }
}

export default GetDayName;