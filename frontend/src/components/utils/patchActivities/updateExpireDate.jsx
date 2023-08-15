import axios from "axios";
import CheckExpiredActivity from "../checkExpiredActivity";

function UpdateExpireDate({id, dateExpired, s}) {
    const myPromise = new Promise((resolve, reject) => {
        axios.patch("/activityHandler", 
          	{id: id, dateExpired: dateExpired}, 
			{
            	headers: {
                	'Content-Type': 'application/json',
            	},
        	}
		)
        .then(response => {
          console.log(response.data);
          resolve(true)
          s(activities => {
            const activeActivities = activities.filter(activity => {
              return CheckExpiredActivity(dateExpired, activity.date)
            })
            return [...activeActivities];
          })
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

          reject(false);
        })
    })
    return myPromise;
}

export default UpdateExpireDate;