/*
    author:xinglie.lkf@taobao.com
 */

let Magix = require('magix');
let setRAF = window.requestAnimationFrame || ((fn) => {
    return setTimeout(fn, 16);
});
let cancelRAF = window.cancelAnimationFrame || clearTimeout;
let Now = Date.now || (() => {
    return new Date().getTime();
});
let Runner = {
    $q: [],
    add(interval, fn) {
        let me = this;
        me.$q.push({
            i: interval || 15,
            f: fn,
            n: Now()
        });
        me.work();
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
    },
    work() {
        let me = this;
        if (!me.$t) {
            let run = () => {
                let q = me.$q;
                for (let i = 0, o, now; i < q.length; i++) {
                    o = q[i];
                    if (o.r) {
                        q.splice(i--, 1);
                    } else {
                        now = Now();
                        if (now - o.n >= o.i) {
                            o.n = now;
                            Magix.toTry(o.f);
                        }
                    }
                }
                if (!q.length) {
                    cancelRAF(me.$t);
                    delete me.$t;
                } else {
                    me.$t = setRAF(run);
                }
            };
            me.$t = setRAF(run);
        }
    }
};

let DALG = t => t;
let FX = Magix.Base.extend({
    ctor(interval, alg) {
        let me = this;
        if (!me.$alg || alg) {
            alg = alg || DALG;
            me.$alg = (from, to) => {
                return (from + (to - from) * alg(me.$current / me.$duration));
            };
        }
        me.$q = [];
        me.$i = interval;
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
            me.$now = Now();
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
                Runner.add(me.$i, me.$tfn);
            }
        } else {
            me.stop();
        }
    },
    stop() {
        let me = this;
        if (me.$tfn) {
            Runner.remove(me.$tfn);
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
};