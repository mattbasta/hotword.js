define('rangeCapture', function() {

    var captures = [];
    var currentCapture;

    window.addEventListener('keydown', function(e) {
        if (e.keyCode !== 32) return; // space
        currentCapture = [];
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode !== 32) return; // space
        captures.push(currentCapture);
        currentCapture = null;
    });

    return {
        send: function(data) {
            if (!currentCapture) return;

            currentCapture.push(data.ranges.slice(0));
        },
    };
});
