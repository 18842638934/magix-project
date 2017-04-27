/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@intro.css');
module.exports = Magix.View.extend({
    tmpl: '@intro.html',
    render() {
        let me = this;
        me.updater.digest();
    }
});