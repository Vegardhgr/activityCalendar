import axios from "axios";

function ExcludeDate({id, dateToBeExcluded}) {
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
        } catch (error) {
            console.error("Error sending data:", error);
            reject(false)
        }
    })
    return myPromise
}

export default ExcludeDate