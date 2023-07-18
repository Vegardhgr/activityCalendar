function SortActivities(activityArray) {
    const sortedActivityArray = [activityArray].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        
        // If the dates are the same, compare the time
        const timeA = new Date(`01/01/2000 ${a.time}`);
        const timeB = new Date(`01/01/2000 ${b.time}`);
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
      
        return 0;
    });
    
    return sortedActivityArray
}

export default SortActivities;