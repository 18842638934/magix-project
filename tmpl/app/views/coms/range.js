/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@range.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@range.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest({
            age: 10,
            ratio: '0.0000',
            r1: 10 / 45
        });
    },
    'showValue<change>' (e) {
        this.updater.digest({
            ratio: e.value.toFixed(4)
        });
    },
    'syncAge<change>' (e) {
        this.updater.digest({
            age: (e.value * 45 + 5).toFixed(0)
        });
    }
});