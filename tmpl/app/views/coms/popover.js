/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@popover.css');
module.exports = Magix.View.extend({
    tmpl: '@popover.html',
    render() {
        let me = this;
        me.updater.digest();
    }
});