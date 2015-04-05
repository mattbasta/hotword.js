define('audioCtx', function() {

    var LOWER_THRESHOLD = -75;

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var incomingStream;


    var analyzer = audioCtx.createAnalyser();
    analyzer.minDecibels = -90;
    analyzer.maxDecibels = -10;
    analyzer.smoothingTimeConstant = 0.85;
    analyzer.fftSize = 512;

    var buffer = new Float32Array(analyzer.frequencyBinCount);

    var dataWrapper = {
        buffer: buffer,
        ranges: [],
    };

    function getRanges() {
        // Clear out existing ranges
        var ranges = dataWrapper.ranges;
        ranges.splice(0, ranges.length);

        var average = 0;
        var max = -1 * Infinity;
        for (var i = 0; i < buffer.length; i++) {
            average += buffer[i];
            max = Math.max(buffer[i], max);
        }
        average /= buffer.length;

        var threshold = (average + max * 3) / 4;
        if (threshold < LOWER_THRESHOLD) {
            return;
        }

        var active = false;
        for (i = 0; i < buffer.length; i++) {
            if (active) {
                if (buffer[i] > threshold) continue;
            } else {
                if (buffer[i] <= threshold) continue;
            }
            active = !active;
            ranges.push(i);
        }
        if (active) {
            ranges.push(i);
        }
    }

    return {
        connectGumStream: function(stream) {
            incomingStream = audioCtx.createMediaStreamSource(stream);
            incomingStream.connect(analyzer);
        },

        getData: function() {
            analyzer.getFloatFrequencyData(buffer);
            getRanges();
            return dataWrapper;
        },

    };
});
