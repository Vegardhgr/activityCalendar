import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home'
import LogIn from '../pages/logIn'
import Calendar from '../pages/calendar'

function Router() {
    return (
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/kalender" element = {<Calendar/>}/>
            <Route path="/log-in" element = {<LogIn/>}/>
        </Routes>
    );
}
export default Router;