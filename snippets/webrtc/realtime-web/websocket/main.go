package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		var upgrader = websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		}

		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Fatal(err)
		}

		log.Println("Client Connected")
		for i := 10; i < 510; i += 10 {
			for j := 10; j < 510; j += 10 {
				if err := conn.WriteMessage(websocket.TextMessage,
					[]byte(strconv.Itoa(j)+","+strconv.Itoa(i)+" ")); err != nil {
					log.Fatal(err)
				}
				time.Sleep(1 * time.Millisecond)
			}
		}
		if err := conn.Close(); err != nil {
			log.Fatal(err)
		}
	})
	log.Println("Server is listening at :8000")
	log.Fatal(http.ListenAndServeTLS(":8000",
		"../certs/localhost.pem", "../certs/localhost-key.pem", nil))
}
