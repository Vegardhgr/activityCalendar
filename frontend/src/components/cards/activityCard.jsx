import { useState } from "react";
import StopActivityPopUp from "../popUp/stopActivityPopUp";
function ActivityCard(props) {
    const [showDeleteActivityPopUp, setShowDeleteActivityPopUp] = useState(false);
    var days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    const date = new Date(props.activity.date);
    const formattedDate = date.toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dayName = days[date.getDay()]

    const timeParts = props.activity.time.split(':');
    const time = new Date();
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    time.setHours(hours);
    time.setMinutes(minutes);
    const formattedTime = time.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });

    
    return (
        <div className="card w-100 mt-2">
            <h5 className="card-header">
                <b><u>{dayName}</u></b> 
                <span> den </span><b><u>{formattedDate}</u></b> 
                <span> klokken </span><b><u>{formattedTime}</u></b>
                <span onClick = {() => setShowDeleteActivityPopUp(!showDeleteActivityPopUp)} style = {{cursor: "pointer", paddingLeft: "20px"}} className="float-end"><u>Slett?</u></span>
            </h5>
            {showDeleteActivityPopUp && 
            <div style = {{zIndex: 9999, position: "absolute"}}>
            <StopActivityPopUp  s = {props.s} activity = {props.activity} setOnClose = {() => setShowDeleteActivityPopUp()} onClose={showDeleteActivityPopUp}/>
            </div>
            }
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default ActivityCard;