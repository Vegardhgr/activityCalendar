package main

import (
	"backend/handlers"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

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

	http.HandleFunc("/activityHandler", handlers.ActivityHandler)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
