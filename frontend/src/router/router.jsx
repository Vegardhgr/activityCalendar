import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home'
import LogIn from '../pages/logIn'

function Router() {
    return (
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/log-in" element = {<LogIn/>}/>
        </Routes>
    );
}
export default Router;