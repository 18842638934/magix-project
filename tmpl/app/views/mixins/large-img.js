/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@large-img.css');
let LargeImg = require('@app/mixins/large-img');
let OptimalImg = require('@app/mixins/optimal-img');
module.exports = Magix.View.extend({
    tmpl: '@large-img.html',
    mixins: [LargeImg, OptimalImg],
    render() {
        let me = this;
        me.updater.digest();
    }
});