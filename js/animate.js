function animate(ele, target, duration, callback) {

    var linear = function (t, b, c, d) {
        return b + t / d * c;
    };
    var begin = {};
    var change = {};
    for (var key in target) {
        begin[key] = utils.css(ele, key);
        change[key] = target[key] - begin[key];
    }
    var time = 0;
    ele.timer && clearInterval(ele.timer);
    ele.timer = window.setInterval(function () {
        time += 10;
        if (time >= duration) {
            clearInterval(ele.timer);
            utils.css(ele, target);
            if (typeof callback == "function") {
                callback.call(ele);
            }
            return;
        }

        for (var key in change) {
            if (change[key]) {
                var val = linear(time, begin[key], change[key], duration);
                utils.css(ele, key, val);
            }
        }


    }, 10)


}