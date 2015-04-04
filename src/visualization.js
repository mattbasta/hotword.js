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

        var i;

        var avg = 0;
        for(i = 0; i < data.length; i++) {
            avg += data[i];
        }
        avg /= data.length;

        for(i = 0; i < data.length; i++) {
            var v = Math.floor((data[i] + 140 + avg) * 2 + 100);
            var y = i / data.length * 600;

            nodeCtx.fillStyle = 'rgb(' + v + ', 0, 0)';
            nodeCtx.fillRect(799, y, 1, 1);
        }

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
