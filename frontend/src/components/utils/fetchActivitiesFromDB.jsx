import axios from "axios";


async function FetchActivitiesFromDB() {
    try {
      const response = await axios.get("/activityHandler?type=getActivity");
      if (response.data !== null) {
          return response.data
      } 
      return [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    };
    
}

export default FetchActivitiesFromDB;