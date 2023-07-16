function ActivityCard(props) {
    var days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    const date = new Date(props.date);
    const formattedDate = date.toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dayName = days[date.getDay()]

    const timeParts = props.time.split(':');
    const time = new Date();
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    time.setHours(hours);
    time.setMinutes(minutes);
    const formattedTime = time.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="card w-100 mt-2">
            <h5 class="card-header"><b><u>{dayName}</u></b> den <b><u>{formattedDate}</u></b> klokken <b><u>{formattedTime}</u></b></h5>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default ActivityCard;