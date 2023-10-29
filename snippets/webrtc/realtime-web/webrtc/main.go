package main

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
	"github.com/pion/webrtc/v3"
)

func encode(obj interface{}) string {
	b, err := json.Marshal(obj)
	if err != nil {
		log.Fatal(err)
	}
	return base64.StdEncoding.EncodeToString(b)
}

func decode(in string, obj interface{}) {
	b, err := base64.StdEncoding.DecodeString(in)
	if err != nil {
		log.Fatal(err)
	}
	err = json.Unmarshal(b, obj)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	config := webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{
			{
				URLs: []string{"stun:stun.l.google.com:19302"},
			},
		},
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		var upgrader = websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		}
		wsConn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Fatal(err)
		}

		log.Println("Client Connected")

		peerConn, err := webrtc.NewPeerConnection(config)
		if err != nil {
			log.Fatal(err)
		}
		peerConn.OnConnectionStateChange(func(s webrtc.PeerConnectionState) {
			log.Printf("Connection State: %s\n", s.String())

			if s == webrtc.PeerConnectionStateFailed {
				log.Fatal("Peer Connection failed")
			}
		})
		peerConn.OnDataChannel(func(channel *webrtc.DataChannel) {
			channel.OnOpen(func() {
				log.Println("Channel Open")
				for i := 10; i < 510; i += 10 {
					for j := 10; j < 510; j += 10 {
						if err := channel.Send([]byte(strconv.Itoa(j) + "," + strconv.Itoa(i) + " ")); err != nil {
							log.Fatal(err)
						}
						time.Sleep(1 * time.Millisecond)
					}
				}
				channel.OnBufferedAmountLow(func() {
					if err := peerConn.Close(); err != nil {
						log.Fatal(err)
					}
				})
			})
		})

		var message []byte = nil
		for {
			_, message, err = wsConn.ReadMessage()
			if err != nil {
				log.Fatal(err)
			}
			if message != nil {
				break
			}
			time.Sleep(10 * time.Millisecond)
		}
		offer := webrtc.SessionDescription{}
		decode(string(message[:]), &offer)
		if err := peerConn.SetRemoteDescription(offer); err != nil {
			log.Fatal(err)
		}

		//log.Printf("Client offer: %s\n", offer)

		answer, err := peerConn.CreateAnswer(nil)
		if err != nil {
			log.Fatal(err)
		}
		if err := peerConn.SetLocalDescription(answer); err != nil {
			log.Fatal(err)
		}

		gatherComplete := webrtc.GatheringCompletePromise(peerConn)
		<-gatherComplete

		//log.Printf("Server answer: %s\n", *pc.LocalDescription())

		if err := wsConn.WriteMessage(websocket.TextMessage, []byte(encode(*peerConn.LocalDescription()))); err != nil {
			log.Fatal(err)
		}
	})

	log.Println("Signaling server is listening at :8002")
	log.Fatal(http.ListenAndServeTLS(":8002",
		"../certs/localhost.pem", "../certs/localhost-key.pem", nil))
}
