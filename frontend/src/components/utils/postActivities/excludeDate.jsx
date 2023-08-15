import axios from "axios";

function ExcludeDate({id, dateToBeExcluded, s}) {
    const myPromise = new Promise((resolve, reject) => {
        try {
            axios.post('/activityHandler?type=excludeActivityDate', 
            {id: id, excludedDate: dateToBeExcluded},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            resolve(true)
            s(activities => {
                const indexToRemove = activities.findIndex(activity => {
                    return (activity.id === id &&
                        new Date(activity.date).getTime() === new Date(dateToBeExcluded).getTime())
                })
                if (indexToRemove !== -1) {
                    const newActivityArray = [...activities]
                    newActivityArray.splice(indexToRemove, 1)
                    return newActivityArray
                }
                return activities
            })
        } catch (error) {
            console.error("Error sending data:", error);
            reject(false)
        }
    })
    return myPromise
}

export default ExcludeDate