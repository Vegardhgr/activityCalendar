import axios from "axios";

const FetchActivitiesFromDB = async({setActivities}) => {
    try {
      const response = await axios.get("/activityHandler?type=getActivity");
      if (response.data !== null) {
        setActivities(response.data);
        console.log("a: " + response.data)
      } 
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    };
    
}

export default FetchActivitiesFromDB;