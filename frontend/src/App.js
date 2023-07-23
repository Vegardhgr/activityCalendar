import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  document.body.style.backgroundColor = "#e8f3f1";
  const [activities, setActivities] = useState([]);
  var defaultActivities = []

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/activityHandler");
      console.log("Reeeeeeesponse: " + response)
      if (activities.length===0) {
        console.log(response.data);
        setActivities(response.data);
      }      
    } catch (error) {
      console.error("Error fetching tasks:", error);
    };
  }
  useEffect(() => {
    fetchTasks();
  }, []); 

    /*defaultActivities = [
    {
        title: "Rustadsaga",
        description: "Tur til Rustadsaga",
        time: "09:00",
        date: "07/16/2023",
        repeat: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }, 
    {
        title: "Sarabråten",
        description: "Tur til Sarabråten",
        time: "10:00",
        date: "07/16/2023",
        repeat: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }, {
      title: "Rustadsaga",
      description: "Tur til Rustadsaga",
      time: "09:00",
      date: "07/16/2023",
      repeat: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
      }
  }, {
    title: "Rustadsaga",
    description: "Tur til Rustadsaga",
    time: "09:00",
    date: "07/16/2023",
    repeat: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }
}, {
  title: "Rustadsaga",
  description: "Tur til Rustadsaga",
  time: "09:00",
  date: "07/16/2023",
  repeat: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
  }
}, {
  title: "Rustadsaga",
  description: "Tur til Rustadsaga",
  time: "09:00",
  date: "07/16/2023",
  repeat: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
  }
}, {
  title: "Rustadsaga",
  description: "Tur til Rustadsaga",
  time: "09:00",
  date: "07/16/2023",
  repeat: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
  }
}, 
  ]*/

  /*if (activities.length===0) {
    setActivities([...defaultActivities]);
  }*/

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
