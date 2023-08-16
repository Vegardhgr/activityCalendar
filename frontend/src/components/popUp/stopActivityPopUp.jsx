import { useContext, useState } from "react";
import "./stopActivityPopUp.css"
import UpdateExpireDate from "../utils/patchActivities/updateExpireDate";
import ExcludeDate from "../utils/postActivities/excludeDate";
import { ActivitiesDispatchContext } from "../utils/activitiesContext";
function DeleteActivityPopUp(props) {
    /*React will understand the following as long as the names
    (onClose, setOnClose) are the same as in the parent component */
    const {onClose, setOnClose} = props 
    const dispatch = useContext(ActivitiesDispatchContext)

    const [moreInfoLi1, setMoreInfoLi1] = useState(false);
    const [moreInfoLi2, setMoreInfoLi2] = useState(false);
    const [moreInfoLi3, setMoreInfoLi3] = useState(false);


    function convertActivityDate() {
        const year = new Date(props.activity.date).getFullYear();
        var month = (new Date(props.activity.date).getMonth() + 1).toString();
        var day = new Date(props.activity.date).getDate().toString();   

        month = month.length === 1 ?
            month.padStart('2', '0') : month;
      
        day = day.length === 1 ? 
            day.padStart('2', '0') : day;
      
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate
    }


    function updateExpireDate() {
        const dateExpired = convertActivityDate()
        UpdateExpireDate({ id: props.activity.id, dateExpired: dateExpired})
        .then(result => {
            if (result) {
                dispatch({
                    type: "deletedAllFutureEvents",
                    id: props.activity.id,
                    expiredDate: dateExpired,
                })
            } else {
                console.log("Failed to delete upcomming events")
            }
        })
        setOnClose(false)
    }

    function excludeDate() {
        const dateToBeExcluded = convertActivityDate()
        ExcludeDate({id: props.activity.id, dateToBeExcluded: dateToBeExcluded})
        .then(result => {
            if (result) {
                dispatch({
                    type: "deletedOneEvent",
                    id: props.activity.id,
                    dateToExclude: dateToBeExcluded,
                })
            } else {
                console.log("Failed to delete the event")
            }
        })
        setOnClose(false)
    }

    return (
        <>
            <div className="overlay" onClick = {() => setOnClose(!onClose)}></div>
            <div className="delete-activity-popup" style={{overflow: "scroll"}}>
                <div style = {{cursor: "pointer", width: "fit-content"}} onClick = {() => setOnClose(!onClose)}><u>Lukk</u></div>
                <ul>
                    <li key = {1}>
                        <span onClick={excludeDate} className = "me-2" style = {{cursor: "pointer"}}><u>Slett kun denne aktiviteten.</u></span>
                        <div style = {{cursor: "pointer"}} onClick = {() => setMoreInfoLi1(!moreInfoLi1)}>{moreInfoLi1 ? "(Se mindre)" : "(Se mer)"}</div>
                        {moreInfoLi1 &&
                        <div>Dette vil kun slette denne aktiviteten.</div>}
                    </li>
                    <li key = {2}>
                        <span onClick={updateExpireDate} style = {{cursor: "pointer"}}><u>Slett kommende aktiviteter av denne typen som faller på denne dagen.</u></span>
                        <div style = {{cursor: "pointer"}} onClick = {() => setMoreInfoLi2(!moreInfoLi2)}>{moreInfoLi2 ? "(Se mindre)" : "(Se mer)"}</div>
                        {moreInfoLi2 &&
                        <div>Dette vil slette denne aktiviteten og alle fremtidige aktiviteter av denne typen som faller på denne ukedagen.</div>}
                    </li>
                    <li key = {3}>
                        <span onClick = {updateExpireDate} style = {{cursor: "pointer"}}><u>Slett alle kommende aktiviteter av denne typen.</u></span>
                        <div style = {{cursor: "pointer"}} onClick = {() => setMoreInfoLi3(!moreInfoLi3)}>{moreInfoLi3 ? "(Se mindre)" : "(Se mer)"}</div>
                        {moreInfoLi3 &&
                        <div>Dette vil slette denne aktiviteten og alle fremtidige aktiviteter av denne typen.</div>}
                    </li>
                </ul>
            </div>
        </>
    )    

}

export default DeleteActivityPopUp;