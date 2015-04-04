define(
    'main',
    ['audioCtx', 'getUserMedia', 'visualization'],
    function(audioCtx, getUserMedia, visualization) {

    if (!getUserMedia.hasGetUserMedia) {
        return;
    }

    getUserMedia.getAudioStream().then(function(stream) {
        audioCtx.connectGumStream(stream);
        visualization.visualize(audioCtx.getData);
    });

});
