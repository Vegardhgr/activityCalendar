import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  document.body.style.backgroundColor = "#e8f3f1";
  const [activities, setActivities] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/activityHandler");
      if (response.data !== null && activities.length===0) {
        setActivities(response.data);
        console.log("resp dataa: " + response.data)
      } 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    };
  }
  useEffect(() => {
    fetchTasks();
  }, []); 


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
