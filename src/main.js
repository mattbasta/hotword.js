define(
    'main',
    ['audioCtx', 'getUserMedia', 'rangeCapture', 'visualization'],
    function(audioCtx, getUserMedia, rangeCapture, visualization) {

    if (!getUserMedia.hasGetUserMedia) {
        return;
    }

    getUserMedia.getAudioStream().then(function(stream) {
        audioCtx.connectGumStream(stream);
        visualization.visualize(audioCtx.getData);
        rangeCapture.send(audioCtx.getData());
    });

});
