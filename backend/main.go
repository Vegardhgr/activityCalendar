package main

import (
	"backend/handlers"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Println("$PORT has not been set. Default is 8080.")
		port = "8080"
	}

	http.HandleFunc("/activityHandler", handlers.ActivityHandler)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
