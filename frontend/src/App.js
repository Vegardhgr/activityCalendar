import NavBar from './components/navBar/navigationBar';
import Router from './router/router';
import { useState, useRef, useEffect, useReducer } from 'react';
import GetRepeatedActivities from './components/utils/getRepeatedActivities';
import FetchActivitiesFromDB from './components/utils/fetchActivitiesFromDB';
import GetAllExcludedDates from './components/utils/getAllExcludedDates';
import { isEqual } from 'lodash';
import { ActivitiesContext, ActivitiesDispatchContext } from "./components/utils/activitiesContext.jsx"
import ActivitiesReducer from "./components/utils/activitiesReducer.jsx"
import SortActivities from './components/utils/sortActivities';

function App() {
	document.body.style.backgroundColor = "#e8f3f1";
	const [activities, dispatch] = useReducer(ActivitiesReducer, [])
	const excludedDatesRef = useRef([])

	/*Fetching activities from DB and fills with repeated tasks */
	async function fetchActivities() {
		excludedDatesRef.current = await GetAllExcludedDates();
		const fetchedActivities = await FetchActivitiesFromDB()
		const updatedActivities =  SortActivities(fetchedActivities.flatMap(activity => GetRepeatedActivities(activity, 365, excludedDatesRef.current)));

		/*Check to see if activities has changed so no unnecessary updates
		happens. It will cause infinite rerenders due to activities is in the 
		dependency array.*/
		if (!isEqual(updatedActivities, activities)) { 
			dispatch({
				type: "addedAllActivities",
				activities: [...updatedActivities],
			});
		}
	}

	useEffect(() => {
		fetchActivities()		 
	}, [activities])

	return (    
		<ActivitiesContext.Provider value = {activities}>
			<ActivitiesDispatchContext.Provider value = {dispatch}>
	    		<NavBar/>
	      		<Router />
			</ActivitiesDispatchContext.Provider>
		</ActivitiesContext.Provider>
	)
}

export default App;
