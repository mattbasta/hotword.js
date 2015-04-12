define('rangeCapture', ['visualization'], function(visualization) {

    var captures = [];
    var currentCapture;
    var status = false;

    window.addEventListener('keydown', function(e) {
        if (status) return;
        if (e.keyCode !== 32) return; // space
        currentCapture = [];
        visualization.drawMarker('lime');
        status = true;
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode !== 32) return; // space
        captures.push(currentCapture);
        currentCapture = null;
        visualization.drawMarker('red');
        status = false;
    });

    return {
        send: function(data) {
            if (!currentCapture) return;

            currentCapture.push(data.ranges.slice(0));
        },
    };
});
