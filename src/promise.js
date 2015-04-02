define('promise', ['defer'], function(defer) {
    return {
        create: function(func) {
            var prom = new defer();
            func(prom.resolve, prom.reject);
            return prom.promise();
        },
    };
});
