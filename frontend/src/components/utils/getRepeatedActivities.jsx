	import GetDayName from "./getDayNames";

	function GetRepeatedActivities(activity, numberOfDaysInFuture) {
		if (activity === undefined) {
			console.log("activity is undefined")
			return
		}

		const dayNamesArr = GetDayName({language: "eng", capitalLetter: false})

		let daysRepeat = [];

		for (var i = 0; i < 7; i++) {
			const day = i
			daysRepeat.push(activity.repeat[dayNamesArr[day]]) 
		}

		console.log(daysRepeat)

		const updateActivityDate = (activity, newDate) => {
			return {
				...activity,
				date: newDate,
			};
		};

		function getValidDate(i, dateToUse) {
			/*If activity.date is greater or equal than today's date, use activity.date*/
			const newDateInMs = new Date(dateToUse).getTime() + i * 24 * 60 * 60 * 1000;
			const futureDate = new Date(newDateInMs);
			
			console.log(activity.date + " : " + futureDate)
			return futureDate;
		}

		/*Adding activities from start date until numberOfDaysInFuture more than today's date*/ 
		const daysInFuture = (new Date() - new Date(activity.date)) > 0 ? 
			numberOfDaysInFuture + (new Date() - new Date(activity.date))/(24*60*60*1000) : (numberOfDaysInFuture)
		let repeatingActivityArray = [];

		for (var i = 1; i <= daysInFuture; i++) {
			const dateToUse = new Date(activity.date)
			const futureDate = new Date(dateToUse.getTime() + (i) * 24 * 60 * 60 * 1000);
			const weekDayOfDayInFuture = new Date(futureDate).getDay()
			console.log("future: " + futureDate)
			if (daysRepeat[weekDayOfDayInFuture]) {
				console.log("w: " + weekDayOfDayInFuture + " : " + dayNamesArr[(new Date(futureDate).getDay())])

				const newDate = getValidDate(i, futureDate);
				const updatedActivity = updateActivityDate(activity, futureDate)
				repeatingActivityArray.push(updatedActivity)
			}
		}

		return repeatingActivityArray;
	}

	export default GetRepeatedActivities;