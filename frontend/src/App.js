import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState } from 'react';

function App() {
  document.body.style.backgroundColor = "#e6ffe6";
  const [activities, setActivities] = useState([]);
  return (
    <div>
        <NavBar/>
        <div>
          <Router activities={activities} setActivities={setActivities}/>
        </div>
    </div>
  );
}

export default App;
