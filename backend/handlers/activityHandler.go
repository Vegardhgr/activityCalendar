package handlers

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type Activity struct {
	Name        string `json:"name"`
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
		activityHandlerGet(w, r)
	default:
		log.Println("No implementation for method " + r.Method)
		http.Error(w, "No implementation for method "+r.Method, http.StatusNotImplemented)
	}
}

func activityHandlerGet(w http.ResponseWriter, r *http.Request) {
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
			Name:        row[0],
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
