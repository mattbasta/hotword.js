define('main', ['audioCtx', 'getUserMedia'], function(audioCtx, getUserMedia) {

    if (!getUserMedia.hasGetUserMedia) {
        return;
    }

    getUserMedia.getAudioStream().then(function(stream) {
        audioCtx.connectGumStream(stream);
    });

});
