/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Store = require('./c-store');
module.exports = Magix.View.extend({
    tmpl: '@store-inner.html',
    mixins: [Store],
    render() {
        let me = this;
        me.store.set({
            rnd: 'inner rnd ' + Math.random()
        }).dispatch('load');
    }
});