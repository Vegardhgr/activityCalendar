package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Activity struct {
	Id          int            `json:"id"`
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Time        string         `json:"time"`
	Date        string         `json:"date"`
	Repeat      Repeat         `json:"repeat"`
	DateExpired sql.NullString `json:"dateExpired"`
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
	fmt.Println("method:", r.Method)
	switch r.Method {
	case http.MethodGet:
		queryValues := r.URL.Query()
		getType := queryValues.Get("type")
		switch getType {
		case "getActivity":
			DBGetActivity(w)
		case "getExcludedDates":
			DBGetExcludedDates(w)
		}
	case http.MethodPost:
		queryValues := r.URL.Query()
		getType := queryValues.Get("type")
		fmt.Println(getType == "excludeActivityDate")
		fmt.Println(getType, ": excludeActivityDate")
		switch getType {
		case "createNewActivity":
			DBCreateNewActivity(w, r)
		case "excludeActivityDate":
			DBExcludeActivityDate(w, r)
		}
	case http.MethodPatch:
		DBUpdateExpireDate(w, r)
	default:
		log.Println("No implementation for method " + r.Method)
		http.Error(w, "No implementation for method "+r.Method, http.StatusNotImplemented)
	}
}

func DBGetActivity(w http.ResponseWriter) {
	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))
	if err != nil {
		fmt.Println("Error validating sql.Open arguments")
		return
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println("Error closing DB")
			return
		}
	}(db)

	//Retrieving all rows from activity table
	activity, err := db.Query("SELECT * FROM activity")

	if err != nil {
		fmt.Println("Error retrieving data from activity table", err.Error())
		return
	}

	var activities []Activity
	for activity.Next() {
		//Attributes in activity table
		var title, description, time, date string
		var activityId int
		var monday, tuesday, wednesday, thursday, friday, saturday, sunday bool
		var dateExpired sql.NullString // Using sql.NullString for nullable strings

		err = activity.Scan(&activityId, &title, &description, &time, &date, &monday, &tuesday, &wednesday, &thursday, &friday, &saturday, &sunday, &dateExpired)

		if err != nil {
			fmt.Println("Error scanning activity:", err.Error())
			return
		}

		// Convert the DB data to an Activity struct
		activity := Activity{
			Id:          activityId,
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
			DateExpired: dateExpired,
		}
		activities = append(activities, activity)
	}

	err = json.NewEncoder(w).Encode(activities)
	if err != nil {
		fmt.Println("Error when encoding activities: ", err)
	}
}

func DBGetExcludedDates(w http.ResponseWriter) {
	type excludedDate struct {
		ID           int    `json:"id"`
		ExcludedDate string `json:"excludedDate"`
	}
	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))
	if err != nil {
		fmt.Println("Error validating sql.Open arguments")
		return
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println("Error closing DB")
			return
		}
	}(db)

	//Retrieving all rows from activity table
	excludedDates, err := db.Query("SELECT * FROM activity_excluded_dates")

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		fmt.Println("Error retrieving data from activity_excluded_dates table", err.Error())
		return
	}

	var allExcludedDates []excludedDate
	for excludedDates.Next() {

		var id int
		var excludeDate string

		err := excludedDates.Scan(&id, &excludeDate)

		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			fmt.Println("Error scanning attributes in table activity_excluded_dates table: ", err.Error())
		}

		excludeActivityDate := excludedDate{
			ID:           id,
			ExcludedDate: excludeDate,
		}

		allExcludedDates = append(allExcludedDates, excludeActivityDate)
	}

	fmt.Println("all dates: ", allExcludedDates)
	err = json.NewEncoder(w).Encode(allExcludedDates)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		fmt.Println("Error when encoding excludedDates: ", err)
	}

}

func DBCreateNewActivity(w http.ResponseWriter, r *http.Request) {
	var activity Activity

	err := json.NewDecoder(r.Body).Decode(&activity)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println("Error when decoding: ", err)
		return
	}

	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))

	defer db.Close()

	monday := activity.Repeat.Monday
	tuesday := activity.Repeat.Tuesday
	wednesday := activity.Repeat.Wednesday
	thursday := activity.Repeat.Thursday
	friday := activity.Repeat.Friday
	saturday := activity.Repeat.Saturday
	sunday := activity.Repeat.Sunday
	_, err = db.Exec("INSERT INTO activity (title, description, time, date, "+
		"monday, tuesday, wednesday, thursday, friday, saturday, sunday)"+
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", activity.Title, activity.Description, activity.Time,
		activity.Date, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
	if err != nil {
		fmt.Println("Error inserting into activity table", err.Error())
		return
	}

}

func DBExcludeActivityDate(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Inside function")
	type excludedDate struct {
		ID           int    `json:"id"`
		ExcludedDate string `json:"excludedDate"`
	}

	var newExcludedDate excludedDate

	err := json.NewDecoder(r.Body).Decode(&newExcludedDate)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println("Error when decoding: ", err)
		return
	}

	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))

	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			fmt.Println("Error closing db")
			return
		}
	}(db)

	query := "INSERT INTO activity_excluded_dates (activity_id, excluded_date)" +
		"VALUES (?, ?)"
	_, err = db.Exec(query, newExcludedDate.ID, newExcludedDate.ExcludedDate)
	if err != nil {
		fmt.Println("Error inserting into  table activity_excluded_dates: " + err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

}

func DBUpdateExpireDate(w http.ResponseWriter, r *http.Request) {
	type modifyActivity struct {
		ID          int    `json:"id"`
		DateExpired string `json:"dateExpired"`
	}
	var activityChanges modifyActivity

	err := json.NewDecoder(r.Body).Decode(&activityChanges)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println("Error when decoding: ", err)
		return
	}

	db, err := sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))

	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			fmt.Println("Error closing db")
			return
		}
	}(db)

	query := "UPDATE activity SET date_expired = ? WHERE activity_id = ?"
	_, err = db.Exec(query, activityChanges.DateExpired, activityChanges.ID)
	if err != nil {
		fmt.Println("Error updating activity: " + err.Error())
	}
}
