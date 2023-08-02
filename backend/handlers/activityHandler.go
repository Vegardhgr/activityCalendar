package handlers

import (
	"database/sql"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

type Activity struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Time        string `json:"time"`
	Date        string `json:"date"`
	Repeat      Repeat
}
type Repeat struct {
	Monday    bool `json:"monday"`
	Tuesday   bool `json:"tuesday"`
	Wednesday bool `json:"wednesday"`
	Thursday  bool `json:"thursday"`
	Friday    bool `json:"friday"`
	Saturday  bool `json:"saturday"`
	Sunday    bool `json:"sunday"`
}

func ActivityHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		//activityHandlerCSVGet(w, r)
		activityHandlerDBGet(w, r)
	case http.MethodPost:
		//activityHandlerCSVPost(w, r)
		activityHandlerDBPost(w, r)
	default:
		log.Println("No implementation for method " + r.Method)
		http.Error(w, "No implementation for method "+r.Method, http.StatusNotImplemented)
	}
}

func activityHandlerDBGet(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))
	if err != nil {
		fmt.Println("Error validating sql.Open arguments")
		return
	}
	defer db.Close()

	//Retrieving all rows from activity_time table
	activityTime, err := db.Query("SELECT * FROM activity_time")

	if err != nil {
		fmt.Println("Error retrieving data from activity_time table", err.Error())
		return
	}

	//Retrieving all rows from activity table
	activity, err := db.Query("SELECT * FROM activity")

	if err != nil {
		fmt.Println("Error retrieving data from activity table", err.Error())
		return
	}

	var activities []Activity
	for activity.Next() && activityTime.Next() {
		//Attributes in activity table
		var title, description string
		var ac_id, time_id int
		var monday, tuesday, wednesday, thursday, friday, saturday, sunday bool

		//Attributes in activity_time table
		var acTimeId int
		var time, date string

		err = activity.Scan(&ac_id, &title, &description, &time_id, &monday, &tuesday, &wednesday, &thursday, &friday, &saturday, &sunday)

		if err != nil {
			fmt.Println("Error scanning activity:", err.Error())
			return
		}

		err = activityTime.Scan(&acTimeId, &time, &date)
		if err != nil {
			fmt.Println("Error scanning activity_time:", err.Error())
			return
		}
		// Convert the CSV data to an Activity struct
		activity := Activity{
			Title:       title,
			Description: description,
			Time:        time,
			Date:        date,
			Repeat: Repeat{
				Monday:    monday,
				Tuesday:   tuesday,
				Wednesday: wednesday,
				Thursday:  thursday,
				Friday:    friday,
				Saturday:  saturday,
				Sunday:    sunday,
			},
		}
		activities = append(activities, activity)
	}
	fmt.Println(activities)
	err = json.NewEncoder(w).Encode(activities)
	if err != nil {
		fmt.Println("Error when encoding activities: ", err)
	}
}

func activityHandlerDBPost(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to the current directory of activityHandler.go
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err) // Handle the error appropriately in your code
	}
	// Open the CSV file
	file, err := os.OpenFile(filepath.Join(currentDir, "../backend/activities.csv"), os.O_APPEND|os.O_WRONLY, os.ModeAppend)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			fmt.Println("Error closing file: ", err)
			return
		}
	}(file)

	writer := csv.NewWriter(file)

	activities := make([]Activity, 0)

	err = json.NewDecoder(r.Body).Decode(&activities)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println("Error when decoding: ", err)
		return
	}

	for _, activity := range activities {
		// Convert the boolean values to their string representation
		mondayStr := strconv.FormatBool(activity.Repeat.Monday)
		tuesdayStr := strconv.FormatBool(activity.Repeat.Tuesday)
		wednesdayStr := strconv.FormatBool(activity.Repeat.Wednesday)
		thursdayStr := strconv.FormatBool(activity.Repeat.Thursday)
		fridayStr := strconv.FormatBool(activity.Repeat.Friday)
		saturdayStr := strconv.FormatBool(activity.Repeat.Saturday)
		sundayStr := strconv.FormatBool(activity.Repeat.Sunday)

		fmt.Println([]string{activity.Title,
			activity.Description, activity.Time, activity.Date,
			mondayStr, tuesdayStr, wednesdayStr, thursdayStr, fridayStr,
			saturdayStr, sundayStr})
		err = writer.Write([]string{activity.Title,
			activity.Description, activity.Time, activity.Date,
			mondayStr, tuesdayStr, wednesdayStr, thursdayStr, fridayStr,
			saturdayStr, sundayStr})
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Println("Error writing CSV record: ", err)
			return
		}
	}

	writer.Flush()
}

func activityHandlerCSVGet(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to the current directory of activityHandler.go
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err) // Handle the error appropriately in your code
	}
	// Open the CSV file
	file, err := os.Open(filepath.Join(currentDir, "../backend/activities.csv"))
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			fmt.Println("Error closing file: ", err)
			return
		}
	}(file)

	reader := csv.NewReader(file)

	//Reading the header
	_, err = reader.Read()
	if err != nil {
		fmt.Println("Error reading the csv-file: ", err)
		return
	}
	var activities []Activity
	for {
		row, err := reader.Read()
		if err != nil {
			if err == io.EOF {
				break // End of file
			}
			fmt.Println("Error reading the csv-file:", err)
			http.Error(w, "Error reading the csv-file", http.StatusInternalServerError)
			return
		}

		// Convert the CSV data to an Activity struct
		activity := Activity{
			Title:       row[0],
			Description: row[1],
			Time:        row[2],
			Date:        row[3],
			Repeat: Repeat{
				Monday:    row[4] == "true",
				Tuesday:   row[5] == "true",
				Wednesday: row[6] == "true",
				Thursday:  row[7] == "true",
				Friday:    row[8] == "true",
				Saturday:  row[9] == "true",
				Sunday:    row[10] == "true",
			},
		}
		activities = append(activities, activity)
	}
	err = json.NewEncoder(w).Encode(activities)
	if err != nil {
		fmt.Println("Error when encoding activities: ", err)
	}
}

func activityHandlerCSVPost(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to the current directory of activityHandler.go
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err) // Handle the error appropriately in your code
	}
	// Open the CSV file
	file, err := os.OpenFile(filepath.Join(currentDir, "../backend/activities.csv"), os.O_APPEND|os.O_WRONLY, os.ModeAppend)

	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			fmt.Println("Error closing file: ", err)
			return
		}
	}(file)

	writer := csv.NewWriter(file)

	activities := make([]Activity, 0)

	err = json.NewDecoder(r.Body).Decode(&activities)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println("Error when decoding: ", err)
		return
	}

	for _, activity := range activities {
		// Convert the boolean values to their string representation
		mondayStr := strconv.FormatBool(activity.Repeat.Monday)
		tuesdayStr := strconv.FormatBool(activity.Repeat.Tuesday)
		wednesdayStr := strconv.FormatBool(activity.Repeat.Wednesday)
		thursdayStr := strconv.FormatBool(activity.Repeat.Thursday)
		fridayStr := strconv.FormatBool(activity.Repeat.Friday)
		saturdayStr := strconv.FormatBool(activity.Repeat.Saturday)
		sundayStr := strconv.FormatBool(activity.Repeat.Sunday)

		fmt.Println([]string{activity.Title,
			activity.Description, activity.Time, activity.Date,
			mondayStr, tuesdayStr, wednesdayStr, thursdayStr, fridayStr,
			saturdayStr, sundayStr})
		err = writer.Write([]string{activity.Title,
			activity.Description, activity.Time, activity.Date,
			mondayStr, tuesdayStr, wednesdayStr, thursdayStr, fridayStr,
			saturdayStr, sundayStr})
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Println("Error writing CSV record: ", err)
			return
		}
	}

	writer.Flush()
}
