define('app/views/coms/index',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var easeInOut = function(e, t, i, o) {
    var s = i / o * 2;
    return (1 > s ? Math.pow(s, 3) : (s -= 2) * Math.pow(s, 2) + 2) * t / 2 + e;
};
var $ = require('$');
var shake = function(a, e, t, i, o) {
    function s() {
        n >= 0 ? (a.css({
                padding: 0
            }),
            n % 2 === 0 ? a.css({
                paddingLeft: easeInOut(0, o, n, i)
            }) : a.css({
                paddingRight: easeInOut(0, o, n, i)
            }),
            n--,
            timer = setTimeout(s, t)) : clearTimeout(timer)
    }
    var n = e;
    var timer = setTimeout(s, t);
};
module.exports = Magix.View.extend({
    tmpl: {"html":"常用组件首页","subs":[]},
    render: function() {
        var me = this;
        me.$updater.digest();
        shake($('#' + me.id), 20, 25, 12, 3);
    }
});
});