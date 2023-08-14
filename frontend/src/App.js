import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useRef, useEffect } from 'react';
import GetRepeatedActivities from './components/utils/getRepeatedActivities';
import FetchActivitiesFromDB from './components/utils/fetchActivitiesFromDB';
import GetAllExcludedDates from './components/utils/getAllExcludedDates';

function App() {
	document.body.style.backgroundColor = "#e8f3f1";
	const [activities, setActivities] = useState([]);
	//const [excludedDates, setExcludedDates] = useState([])
	const excludedDatesRef = useRef([])
	const [renderApp, setRenderApp] = useState(false);
	const [hasFilledRepeatedTasks, setHasFilledRepeatedTasks] = useState(false);

	function fillWithRepeatedTasks() {
		setActivities(prevActivities => {
			const updatedActivities = prevActivities.flatMap(activity => GetRepeatedActivities(activity, 365, excludedDatesRef.current));
			return [...prevActivities, ...updatedActivities];
		});
		setHasFilledRepeatedTasks(true);
	}

	/*Fetching activities from DB and fills with repeated tasks */
	async function fetchAndFill() {
		excludedDatesRef.current =  await GetAllExcludedDates();
		console.log(excludedDatesRef.current)
		await FetchActivitiesFromDB({setActivities: setActivities});
		fillWithRepeatedTasks()
	}

	useEffect(() => {
		if (excludedDatesRef.length != 0) {
			console.log("æææ: " + excludedDatesRef)
			setRenderApp(true)
		}
	}, [excludedDatesRef, renderApp])

	useEffect(() => {
		fetchAndFill()
	}, []); 

	return <>
	    {!renderApp ? "" : 
	      <div>
	        <NavBar/>
	        <div>
	          <Router activities={activities} setActivities={setActivities}/>
	        </div>
	    </div>
	    }
	</>
}

export default App;
