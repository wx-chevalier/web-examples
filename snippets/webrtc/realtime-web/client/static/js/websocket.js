import {chart, initCanvas, visualizePacket} from "./common.js";

const webSocketBtn = document.getElementById("websocket");
const serverUrl = "wss://localhost:8000";

webSocketBtn.onclick = (_) => {
    initCanvas()
    console.info(`Connecting to WebSocket server at ${serverUrl} ...`);

    let t0 = new Date();
    let messageCount = 0;
    const client = new WebSocket(serverUrl);

    client.onopen = (_) => {
        console.info(`Connection established in ${new Date() - t0} ms.`);
        webSocketBtn.disabled = true
        t0 = new Date();
        chart.data.datasets[0].data.push({x: 0, y: 0});
    }

    client.onmessage = (e) => {
        messageCount += 1;
        if (new Date() - t0 - chart.data.datasets[0].data.at(-1).x > 200) {
            chart.data.datasets[0].data.push({x: new Date() - t0, y: messageCount});
            chart.update();
        }
        visualizePacket(e.data);
    }

    client.onclose = (_) => {
        chart.data.datasets[0].data.push({x: new Date() - t0, y: messageCount});
        chart.update();
        console.info(`${messageCount} message(s) were received within ${new Date() - t0} ms.`)
        console.info('Disconnected from WebSocket server.');
    }

    client.onerror = (_) => {
        console.error('Failed to connect to WebSocket server');
    }
}
