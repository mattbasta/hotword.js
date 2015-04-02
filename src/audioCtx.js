define('audioCtx', function() {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var incomingStream;

    return {
        connectGumStream: function(stream) {
            incomingStream = audioCtx.create
        }

    };
});
