import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useEffect } from 'react';

function App() {
  document.body.style.backgroundColor = "#e8f3f1";
  const [activities, setActivities] = useState([]);
  const defaultActivities = [
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
  ]

  if (activities.length===0) {
    setActivities([...defaultActivities]);
  }

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
