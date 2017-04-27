/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@large-img.css');
let LargeImg = require('@app/mixins/large-img');
module.exports = Magix.View.extend({
    tmpl: '@large-img.html',
    mixins: [LargeImg],
    render() {
        let me = this;
        me.updater.digest();
    }
});