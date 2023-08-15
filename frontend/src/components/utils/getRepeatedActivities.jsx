import CheckExpiredActivity from "./checkExpiredActivity";
import GetDayName from "./getDayNames";
function GetRepeatedActivities(activity, numberOfDaysInFuture, excludedDates) {
	if (activity === undefined) {
		console.log("activity is undefined")
		return
	}
	console.log("check this: " + excludedDates)
	let relevantExcludedDates = []
	if (excludedDates !== undefined) {
		relevantExcludedDates = excludedDates.filter(excludedActivityDate => {
			if (excludedActivityDate.id === activity.id) {
				return excludedActivityDate;
			}
		})
	}
	const dayNamesArr = GetDayName({language: "eng", capitalLetter: false})
	let daysRepeat = [];
	for (var i = 0; i < 7; i++) {
		const day = i
		daysRepeat.push(activity.repeat[dayNamesArr[day]]) 
	}
	const updateActivityDate = (activity, newDate) => {
		return {
			...activity,
			date: newDate,
		};
	};
	/*Adding activities from start date until numberOfDaysInFuture more than today's date*/ 
	const daysInFuture = (new Date() - new Date(activity.date)) > 0 ? 
		numberOfDaysInFuture + (new Date() - new Date(activity.date))/(24*60*60*1000) : (numberOfDaysInFuture)
	let repeatingActivityArray = [];
	for (var i = 1; i <= daysInFuture; i++) {
		const startDateOfActivity = new Date(activity.date)
		const newUpdatedDate = new Date(startDateOfActivity.getTime() + (i) * 24 * 60 * 60 * 1000);
		const weekDayOfDayInFuture = new Date(newUpdatedDate).getDay()
		const isActivityActive = CheckExpiredActivity(activity.dateExpired.String, newUpdatedDate)
		if (!isActivityActive) { /*No need to look for more activities*/
			return repeatingActivityArray
		}

		const isActivityExcluded = relevantExcludedDates.find(excludedDates => 
			new Date(excludedDates.excludedDate).getTime() === newUpdatedDate.getTime()
		)

		
		if (!isActivityExcluded && daysRepeat[weekDayOfDayInFuture]) {
			const updatedActivity = updateActivityDate(activity, newUpdatedDate)
			repeatingActivityArray.push(updatedActivity)
		}
	}
	return repeatingActivityArray;
}
export default GetRepeatedActivities;