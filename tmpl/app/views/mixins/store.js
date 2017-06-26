/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Store = require('./c-store');
module.exports = Magix.View.extend({
    tmpl: '@store.html',
    mixins: [Store],
    render() {
        let me = this;
        me.store.set({
            rnd: Math.random()
        }).dispatch('load');
    },
    'inc<click>' () {
        this.store.set({
            rnd: Math.random()
        }).dispatch('increase');
    },
    'inc1<click>' () {
        Store.dispatch('increase');
    },
    'uts<click>' () {
        Store.dispatch('test');
    }
});