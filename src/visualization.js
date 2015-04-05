define('visualization', function() {
    var node = document.querySelector('.visualization');
    var nodeCtx = node.getContext('2d');
    nodeCtx.clearRect(0, 0, 800, 600);

    var drawCB;

    var dataCB;

    function draw() {
        var data = dataCB();

        nodeCtx.drawImage(
            node,
            1, 0,
            799, 600,
            0, 0,
            799, 600
        );
        nodeCtx.clearRect(799, 0, 1, 600);

        var i;

        var buffer = data.buffer;

        var avg = 0;
        for(i = 0; i < buffer.length; i++) {
            avg += buffer[i];
        }
        avg /= buffer.length;

        var v = 0;
        var y = 0;
        for (i = 0; i < 600; i++) {
            v = Math.min(
                Math.floor(
                    (
                        buffer[i * buffer.length / 600 | 0] +
                        140 +
                        avg
                    ) *
                    2 +
                    100
                ),
                255
            );
            nodeCtx.fillStyle = 'rgb(' + v + ', 0, 0)';
            nodeCtx.fillRect(798, i, 2, 1);
        }

        nodeCtx.fillStyle = 'rgba(100, 200, 255, 0.5)';
        var ranges = data.ranges;
        for (i = 0; i < ranges.length; i += 2) {
            y = ranges[i] / buffer.length * 600;
            nodeCtx.fillRect(
                798,
                // 100,
                y,
                2,
                // 100
                ranges[i + 1] / buffer.length * 600 - y
            );
        }
        nodeCtx.fillStyle = 'black';

        drawCB = requestAnimationFrame(draw);
    }

    return {

        visualize: function visualize(newDataCB) {
            if (drawCB) {
                cancelAnimationFrame(drawCB);
                drawCB = null;
            }

            dataCB = newDataCB;

            drawCB = requestAnimationFrame(draw);

        },

    };
});
