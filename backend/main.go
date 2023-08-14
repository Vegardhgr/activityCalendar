package main

import (
	"backend/handlers"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Println("$PORT has not been set. Default is 8080.")
		port = "8080"
	}
	err := LoadEnvFromFile()
	if err != nil {
		fmt.Println("Error reading from env file", err.Error())
		return
	}

	// Opening the database connection
	db, err = sql.Open("mysql", os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp("+
		os.Getenv("DB_HOSTNAME")+")/"+os.Getenv("DB_NAME"))
	if err != nil {
		fmt.Println("Error connecting to the database:", err.Error())
		return
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println("Error closing the database" + err.Error())
		}
	}(db)

	// Setting connection pool properties
	db.SetMaxOpenConns(10) // Maximum number of open connections
	db.SetMaxIdleConns(5)  // Maximum number of idle connections

	http.HandleFunc("/activityHandler", handlers.ActivityHandler)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
