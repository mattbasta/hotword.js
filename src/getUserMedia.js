define('getUserMedia', ['promise'], function(promise) {
    var gUM = (navigator.getUserMedia ||
               navigator.webkitGetUserMedia ||
               navigator.mozGetUserMedia ||
               navigator.msGetUserMedia);

    function hasGetUserMedia() {
        return !!gUM;
    }

    function returnNull() {
        return null;
    }

    var exports = {
        hasGetUserMedia: hasGetUserMedia,

        getAudioStream: returnNull,
    };

    // Fail early on a lack of gUM
    if (!hasGetUserMedia()) {
        console.error('getUserMedia is not available.');
        return exports;
    }


    exports.getAudioStream = function getAudioStream() {
        return promise.create(function(resolve, reject) {
            gUM({
                audio: true,
            }, resolve, reject);
        });
    };

    return exports;

});
