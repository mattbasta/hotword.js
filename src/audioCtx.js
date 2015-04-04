define('audioCtx', function() {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var incomingStream;


    var analyzer = audioCtx.createAnalyser();
    analyzer.minDecibels = -90;
    analyzer.maxDecibels = -10;
    analyzer.smoothingTimeConstant = 0.85;
    analyzer.fftSize = 512;

    var buffer = new Float32Array(analyzer.frequencyBinCount);

    return {
        connectGumStream: function(stream) {
            incomingStream = audioCtx.createMediaStreamSource(stream);
            incomingStream.connect(analyzer);
        },

        getData: function() {
            analyzer.getFloatFrequencyData(buffer);
            return buffer;
        },

    };
});
