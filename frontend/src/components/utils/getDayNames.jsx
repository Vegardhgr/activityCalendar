function GetDayName({language, capitalLetter}) {
    const dayNamesEng = ["Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday"];
    const dayNamesNorCapital = ["Søndag, Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Lørdag"];
    const dayNamesNor = ["søndag, mandag, tirsdag, onsdag, torsdag, fredag, lørdag"];

    if (language === "eng") {
        return dayNamesEng
    } else if (language === "eng" && capitalLetter === true) {
        return dayNamesNorCapital;
    } else {
        return dayNamesNor
    }
}

export default GetDayName;