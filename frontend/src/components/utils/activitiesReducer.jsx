function ActivitiesReducer(activities, action) {
    console.log("action type: " + action.type)
    switch (action.type) {
        case "addedAllActivities": {
            console.log("w: " + [...action.activities])
            return [...action.activities]
        }

        case "addedOneActivity": {
            return [...activities, action.newActivity]
        }
            
        case "deletedAllFutureEvents": {
            const newActivityArray = activities.filter(activity => 
                activity.id !== action.id ||
                new Date(activity.date).getTime() < new Date(action.expiredDate).getTime())
            return [...newActivityArray]
        }

        case "deletedOneEvent": {
            const indexToRemove = activities.findIndex(activity => {
                return (activity.id === action.id &&
                    new Date(activity.date).getTime() === new Date(action.dateToExclude).getTime())
            })
            if (indexToRemove !== -1) {
                const newActivityArray = [...activities]
                newActivityArray.splice(indexToRemove, 1)
                return newActivityArray
            }
            return [...activities]
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }

    }
}

export default ActivitiesReducer