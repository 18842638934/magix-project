/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let FX = require('@app/mixins/fx');
Magix.applyStyle('@fx.css');
module.exports = Magix.View.extend({
    tmpl: '@fx.html',
    mixins: [FX],
    render() {
        let me = this;
        me.updater.digest({
            count: 0
        });
    },
    'up<click>' () {
        let updater = this.updater;
        let start = updater.get('count'); //获取当前的总数
        let fx = this.getFX();
        fx.run(500, (alg) => {
            let current = alg(start, start + 100) | 0;
            updater.digest({
                count: current
            });
        });
    }
});