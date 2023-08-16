import axios from "axios";

function UpdateExpireDate({id, dateExpired}) {
	
    const myPromise = new Promise((resolve, reject) => {
        axios.patch("/activityHandler", 
          	{id: id, dateExpired: dateExpired}, 
			{
            	headers: {
                	'Content-Type': 'application/json',
            	},
        	}
		)
        .then(() => {
          	resolve(true)		  	
        })
        .catch(() => {
          reject(false);
        })
    })
    return myPromise;
}

export default UpdateExpireDate;