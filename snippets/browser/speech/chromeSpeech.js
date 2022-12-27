reading = false;
timer = false;
function googleSpeech(text, rate) {
    if (!reading) {
        speechSynthesis.cancel();
        if (timer) {
            clearInterval(timer);
        }
        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[63];
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = rate; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'zh-CN';

        msg.onerror = function (e) {
            speechSynthesis.cancel();
            reading = false;
            clearInterval(timer);
        };

        msg.onpause = function (e) {
        };

        msg.onboundary = function (event) {
        };

        msg.onend = function (e) {
            speechSynthesis.cancel();
            reading = false;
            clearInterval(timer);
        };

        speechSynthesis.onerror = function (e) {
            speechSynthesis.cancel();
            reading = false;
            clearInterval(timer);
        };

        console.log(msg);
        speechSynthesis.speak(msg);

        timer = setInterval(function () {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            }

        }, 100);

        reading = true;
    }

}
