import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useRef, useEffect, useReducer } from 'react';
import GetRepeatedActivities from './components/utils/getRepeatedActivities';
import FetchActivitiesFromDB from './components/utils/fetchActivitiesFromDB';
import GetAllExcludedDates from './components/utils/getAllExcludedDates';
import { isEqual } from 'lodash';

function App() {
	document.body.style.backgroundColor = "#e8f3f1";
	const [activities, setActivities] = useState([]);
	const excludedDatesRef = useRef([])
	const [renderApp, setRenderApp] = useState(false);
	const prevActivitiesRef = useRef(activities);
	const [shouldFetchAndFill, setShouldFetchAndFill] = useState(true);

	//const [activities, dispatch] = useReducer(activitiesReducer, initialActivities)

	async function fillWithRepeatedTasks() {
		setActivities(prevActivities => {
			const updatedActivities = prevActivities.flatMap(activity => GetRepeatedActivities(activity, 365, excludedDatesRef.current));
			return [...prevActivities, ...updatedActivities];
		});
	}

	/*Fetching activities from DB and fills with repeated tasks */
	async function fetchAndFill() {
		excludedDatesRef.current =  await GetAllExcludedDates();
		await FetchActivitiesFromDB({setActivities: setActivities});
		await fillWithRepeatedTasks()
	}

	useEffect(() => {
		if (excludedDatesRef.length != 0) {
			setRenderApp(true)
		}
	}, [excludedDatesRef, renderApp])


	useEffect(() => {
        if (shouldFetchAndFill) {
            fetchAndFill();
            setShouldFetchAndFill(false);
        }
    }, [shouldFetchAndFill]);

    useEffect(() => {
        if (!isEqual(prevActivitiesRef.current, activities)) {
            setShouldFetchAndFill(true);
            prevActivitiesRef.current = activities;
        }
    }, [activities]);


	return <>
	    {!renderApp ? "" : 
	      <div>
	        <NavBar/>
	        <div>
	          <Router activities={activities} s={setActivities}/>
	        </div>
	    </div>
	    }
	</>
}

export default App;
