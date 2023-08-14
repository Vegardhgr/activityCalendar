import axios from "axios";

const GetAllExcludedDates = async() => {
    try {
        const response = await axios.get("/activityHandler?type=getExcludedDates")
        if (response.data !== null) {
            return response.data
        }
    } catch (error) {
        console.log("Error fetching excluded dates: " + error)
        return []
    }
}

export default GetAllExcludedDates;