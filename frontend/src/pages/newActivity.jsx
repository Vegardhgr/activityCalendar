import { React, useEffect, useRef, useState } from 'react';
import GetDayName from '../components/utils/getDayNames';

function NewActivity({setActivities}) {
    const hoursInputRef = useRef(null);
    const minutesInputRef = useRef(null);
    const dateInputRef = useRef(null);
    const [activityTime, setActivityTime] = useState("00:00");
    const [activityDate, setActivityDate] = useState(null);
    const [repeatActivityCheckBoxChecked, setRepeatActivityCheckBoxChecked] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const activityNameRef = useRef("");
    const descriptionRef = useRef("");

    var dayNames = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    useEffect(() => {
        dayNames = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday])

    const getDateByIncrement = (date, increment) => {
      
        // Creating the date instance
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear()
        if (day + increment > new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()) {
            day = String(day+increment - new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate());
            month = month+1;
        } else {
            day = String(d.getDate() + increment)
        }
        if (month === 12) {
            month = 0;
            year += 1;
        }

        
        
      
        // Adding leading 0 if the day or month
        // is one digit value
        month = month.length === 1 ? 
            month.padStart('2', '0') : month;
      
        day = day.length === 1 ? 
            day.padStart('2', '0') : day;
      
        // Printing the present date
        return (`${year}/${month}/${day}`);
    }
      

    function getActivity() {
        const activityArray = [{
            title: activityNameRef.current.value,
            description: descriptionRef.current.value,
            time: activityTime,
            date: activityDate,
            repeat: {
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday
            }
        }]

        if (repeatActivityCheckBoxChecked) {
            for (var i = 1; i<=30; i++) {
                const dateOfRepeatedActivity = new Date(getDateByIncrement(activityDate, i));
                if (dayNames[(dateOfRepeatedActivity.getDay()-1)%7]) {
                    activityArray.push(
                        {
                            title: activityNameRef.current.value,
                            description: descriptionRef.current.value,
                            time: activityTime,
                            date: dateOfRepeatedActivity,
                            repeat: {
                                monday: monday,
                                tuesday: tuesday,
                                wednesday: wednesday,
                                thursday: thursday,
                                friday: friday,
                                saturday: saturday,
                                sunday: sunday
                            }
                        }
                    );
                }
            }  
        }
        
        return activityArray;
    }

    function submitHandler(event) {
        event.preventDefault();
        var activities = [];
        activities = getActivity();
        setActivities(existingActivities => 
            [...existingActivities, ...activities]);
    }

    const handleInputChange = () => {
        setActivityTime(hoursInputRef.current.value + ":" + minutesInputRef.current.value);
        setActivityDate(dateInputRef.current.value);
    }

    const repeatActivityCheckBoxChange = () => {
        setRepeatActivityCheckBoxChecked(!repeatActivityCheckBoxChecked);
    }

    function repeatActivity() {
        return(
            <div className = "d-flex align-items-center">
                <div className = "me-3">
                    <input type = "checkbox" id = "monday" onChange={() => setMonday(!monday)}/>
                    <label className = "ms-1" for = "monday">Mandag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "tuesday" onChange={() => setTuesday(!tuesday)}/>
                    <label className = "ms-1" for = "tuesday">Tirsdag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "wednesday" onChange={() => setWednesday(!wednesday)}/>
                    <label className = "ms-1" for = "wednesday">Onsdag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "thursday" onChange={() => setThursday(!thursday)}/>
                    <label className = "ms-1" for = "thursday">Torsdag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "friday" onChange={() => setFriday(!friday)}/>
                    <label className = "ms-1" for = "friday">Fredag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "saturday" onChange={() => setSaturday(!saturday)}/>
                    <label className = "ms-1" for = "saturday">Lørdag</label>
                </div>
                <div className = "me-3">
                    <input type = "checkbox" id = "sunday" onChange={() => setSunday(!sunday)}/>
                    <label className = "ms-1" for = "sunday">Søndag</label>
                </div>
            </div>
        )
    }

    function renderHourOptions() {
        var options = [];
        for (var i = 0; i < 24; i++) {
            i < 10
                ? options.push(
                    <option value={i} key={i}>
                        0{i}
                    </option>
                )
                : options.push(
                    <option value={i} key={i}>
                        {0 + i}
                    </option>
                );
        }
        return options;
    }
    
    function renderMinuteOptions() {
        var options = [];
        for (var i = 0; i < 60; i++) {
            if (i%5 === 0) {
                i < 10
                    ? options.push(
                        <option value={i} key={i}>
                          0{i}
                        </option>
                      )
                    : options.push(
                        <option value={i} key={i}>
                          {0 + i}
                        </option>
                      );
            }
        }
        return options;
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <h2><u>Ny aktivitet</u></h2>
                <form className="row g-3" onSubmit={submitHandler}>
                    <div className="col-12">
                        <label for="activityName" className="form-label">
                            Navn
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="activityName"
                            placeholder="Eks: Tur til ..."
                            ref = {activityNameRef}
                        />
                    </div>
                    <div className="col-12">
                        <label for="activityDescription" className="form-label">
                            Beskrivelse
                        </label>
                        <textarea
                            rows="4"
                            className="form-control"
                            id="activityDescription"
                            placeholder="Skriv informasjon om turen her."
                            ref = {descriptionRef}
                        />
                    </div>
                    <div>
                        <label>Tidspunkt</label>
                        <div className = "d-flex align-items-center me-2">
                            <div className="col-md-2 d-flex align-items-center">
                                <select className="form-select me-2" ref={hoursInputRef} onChange={handleInputChange}>
                                    {renderHourOptions()}
                                </select>
                                <div className = "me-2">:</div>
                                <select className="form-select" ref={minutesInputRef} onChange={handleInputChange}>
                                    {renderMinuteOptions()}
                                </select>
                            </div>
                            <div className="ms-2">
                                <input type="date" ref={dateInputRef} onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className = "d-flex align-items-center">
                        <div className = "me-2">
                            <label for = "repeatActivityCheckBox">Repeter aktiviteten?</label>
                        </div>
                        <input 
                            type="checkbox"
                            id = "repeatActivityCheckBox"
                            onChange = {repeatActivityCheckBoxChange} />
                    </div>

                    {repeatActivityCheckBoxChecked ? repeatActivity() : "" }

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Lagre
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default NewActivity;
