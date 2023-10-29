usage="Usage: $(basename "$0") client|websocket|webrtc|webtransport"

if [ $# != 1 ]; then
  echo "$usage"
  exit
fi

cd "$1" 2> /dev/null || ( echo "$usage" && exit )
go run main.go
