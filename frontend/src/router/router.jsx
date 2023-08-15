import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home'
import LogIn from '../pages/logIn'
import Calendar from '../pages/calendar'
import NewActivity from "../pages/newActivity";
import UpcomingActivities from '../pages/upcomingActivities';

function Router({activities, s}) {
    console.log("Router: " + activities)
    return (
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/kalender" element = {<Calendar activities={activities}/>}/>
            <Route path="/logg-inn" element = {<LogIn/>}/>
            <Route path="/ny-aktivitet" element = {<NewActivity s = {s}/>}/>
            <Route path="/kommende-aktiviteter" element = {<UpcomingActivities activities={activities} s = {s} />}/>
        </Routes>
    );
}   
export default Router;