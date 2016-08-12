/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Cache = {};
var Runner = function(interval) {
    var me = this;
    me.$i = interval;
    me.$q = [];
};
Magix.mix(Runner.prototype, {
    run: function() {
        var me = this;
        if (!me.$t) {
            me.$t = setInterval(function() {
                var q = me.$q;
                for (var i = 0, o; i < q.length; i++) {
                    o = q[i];
                    if (o.r) {
                        i--;
                        q.splice(i, 1);
                    } else {
                        Magix.toTry(o.f);
                    }
                }
                if (!q.length) {
                    clearInterval(me.$t);
                    delete me.$t;
                }
            }, me.$i);
        }
    },
    add: function(fn) {
        var me = this;
        me.$q.push({
            f: fn
        });
        me.run();
    },
    remove: function(fn) {
        var me = this;
        var q = me.$q;
        for (var o, i = 0; i < q.length; i++) {
            o = q[i];
            if (!o.r && o.f == fn) {
                o.r = 1;
                break;
            }
        }
    }
});
module.exports = {
    get: function(i) {
        var entity = Cache[i];
        if (!entity) {
            entity = new Runner(i);
            Cache[i] = entity;
        }
        return entity;
    }
};