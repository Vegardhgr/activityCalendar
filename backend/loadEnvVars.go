package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func LoadEnvFromFile() error {
	file, err := os.Open("dbcredentials.env")
	if err != nil {
		return err
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			fmt.Println("Error closing dbcredentials.env file", err.Error())
			return
		}
	}(file)

	// Read the env file line by line
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		// Split the line into key-value pairs
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])

			// Set the environment variable
			err := os.Setenv(key, value)
			if err != nil {
				fmt.Println("Error setting environment variable", err.Error())
				return err
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err.Error())
		return err
	}

	return nil
}
