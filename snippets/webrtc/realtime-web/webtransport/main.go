package main

import (
	"context"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/adriancable/webtransport-go"
)

var reliable = false

func main() {
	server := &webtransport.Server{
		ListenAddr:     ":8001",
		TLSCert:        webtransport.CertFile{Path: "../certs/localhost.pem"},
		TLSKey:         webtransport.CertFile{Path: "../certs/localhost-key.pem"},
		AllowedOrigins: []string{"localhost:3000", "localhost:63342"},
		QuicConfig: &webtransport.QuicConfig{
			KeepAlive:      true,
			MaxIdleTimeout: 30 * time.Second,
		},
	}

	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		session := r.Body.(*webtransport.Session)
		session.AcceptSession()
		log.Printf("Client Connected\n")

		if reliable {
			stream, err := session.OpenUniStreamSync(session.Context())
			if err != nil {
				log.Fatal(err)
			}
			for i := 10; i < 510; i += 10 {
				for j := 10; j < 510; j += 10 {
					_, err := stream.Write([]byte(strconv.Itoa(j) + "," + strconv.Itoa(i) + " "))
					if err != nil {
						log.Fatal(err)
					}
					time.Sleep(1 * time.Millisecond)
				}
			}
		} else {
			for i := 10; i < 510; i += 10 {
				for j := 10; j < 510; j += 10 {
					err := session.SendMessage([]byte(strconv.Itoa(j) + "," + strconv.Itoa(i) + " "))
					if err != nil {
						log.Fatal(err)
					}
					time.Sleep(1 * time.Millisecond)
				}
			}
		}
		<-session.Context().Done()
		if err := session.Close(); err != nil {
			log.Fatal(err)
		}
	})

	ctx, cancel := context.WithCancel(context.Background())
	log.Println("Server is listening at :8001")
	if err := server.Run(ctx); err != nil {
		cancel()
		log.Fatal(err)
	}
}
