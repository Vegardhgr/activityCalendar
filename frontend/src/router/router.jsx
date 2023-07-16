import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home'
import LogIn from '../pages/logIn'
import Calendar from '../pages/calendar'
import NewActivity from "../pages/newActivity";
import UpcomingActivities from '../pages/upcomingActivities';

function Router({activities, setActivities}) {
    return (
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/kalender" element = {<Calendar/>}/>
            <Route path="/logg-inn" element = {<LogIn/>}/>
            <Route path="/ny-aktivitet" element = {<NewActivity setActivities={setActivities} />}/>
            <Route path="/kommende-aktiviteter" element = {<UpcomingActivities activities={activities} />}/>
        </Routes>
    );
}
export default Router;