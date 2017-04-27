/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let Cache = {};
let Runner = function(interval) {
    let me = this;
    me.$i = interval;
    me.$q = [];
};
Magix.mix(Runner.prototype, {
    run() {
        let me = this;
        if (!me.$t) {
            me.$t = setInterval(() => {
                let q = me.$q;
                for (let i = 0, o; i < q.length; i++) {
                    o = q[i];
                    if (o.r) {
                        q.splice(i--, 1);
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
    add(fn) {
        let me = this;
        me.$q.push({
            f: fn
        });
        me.run();
    },
    remove(fn) {
        let me = this;
        let q = me.$q;
        for (let o, i = 0; i < q.length; i++) {
            o = q[i];
            if (!o.r && o.f == fn) {
                o.r = 1;
                break;
            }
        }
    }
});
Runner.get = (i) => {
    let entity = Cache[i];
    if (!entity) {
        entity = new Runner(i);
        Cache[i] = entity;
    }
    return entity;
};
let DALG = (t) => t;
let FX = Magix.Base.extend({
    ctor(alg, interval) {
        let me = this;
        if (!me.$alg || alg) {
            alg = alg || DALG;
            me.$alg = (from, to) => {
                return (from + (to - from) * alg(me.$current / me.$duration));
            };
        }
        me.$timer = Runner.get(interval || 13);
        me.$q = [];
    },
    run(time, callback) {
        let me = this;
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
    work() {
        let me = this;
        let item = me.$q.shift();
        if (item) {
            me.$duration = item.time;
            me.$f = item.f;
            me.$now = Date.now();
            if (!me.$tfn) {
                me.$tfn = (end) => {
                    me.$current = Date.now() - me.$now;
                    if (me.$current > me.$duration) {
                        end = me.$current = me.$duration;
                    }
                    try {
                        me.$f(me.$alg);
                    } catch (e) {
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
    stop() {
        let me = this;
        if (me.$tfn) {
            me.$timer.remove(me.$tfn);
            delete me.$tfn;
            me.fire('stop');
        }
    },
    destroy() {
        let me = this;
        me.stop();
        me.$q = [];
        me.$die = 1;
    }
});
module.exports = {
    getFX() {
        let fx = new FX();
        this.capture(Magix.guid('fx_'), fx, true);
        return fx;
    }
}