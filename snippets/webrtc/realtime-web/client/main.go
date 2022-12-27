package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Println("Serving static files at :3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
