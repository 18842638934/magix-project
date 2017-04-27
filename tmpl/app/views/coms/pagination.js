/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@pagination.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@pagination.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'pageChange<change>' (e) {
        this.gtipRT(JSON.stringify(e.state));
    }
});