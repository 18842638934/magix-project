/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Timer = require('./timer');
var DALG = function(t) {
    return t;
};
module.exports = Magix.Base.extend({
    ctor: function(alg, interval) {
        var me = this;
        if (!me.$alg || alg) {
            alg = alg || DALG;
            me.$alg = function(from, to) {
                return (from + (to - from) * alg(me.$current / me.$duration));
            };
        }
        me.$timer = Timer.get(interval || 13);
        me.$q = [];
    },
    run: function(time, callback) {
        var me = this;
        if (!me.$die) {
            me.$q.push({
                time: time,
                f: callback
            });
            if (!me.$tfn) {
                me.work();
            }
        }
    },
    work: function() {
        var me = this;
        var item = me.$q.shift();
        if (item) {
            me.$duration = item.time;
            me.$f = item.f;
            me.$now = $.now();
            if (!me.$tfn) {
                me.$tfn = function(end) {
                    me.$current = $.now() - me.$now;
                    if (me.$current > me.$duration) {
                        end = me.$current = me.$duration;
                    }
                    try {
                        me.$f(me.$alg);
                    } catch (e) {
                        console.log(e);
                        end = e;
                    }
                    if (end) {
                        me.work();
                    }
                };
                me.$timer.add(me.$tfn);
            }
        } else {
            me.stop();
        }
    },
    stop: function() {
        var me = this;
        if (me.$tfn) {
            me.$timer.remove(me.$tfn);
            delete me.$tfn;
            me.fire('stop');
        }
    },
    destroy: function() {
        var me = this;
        me.stop();
        me.$q = [];
        me.$die = 1;
    }
});