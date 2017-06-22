/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Store = require('@app/mixins/store');
module.exports = Store.extend({
    // init() {
    //     console.log('store init');
    //     return {
    //         count: 1,
    //         share: 1
    //     };
    // },
    load() {
        let me = this;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    count: (me.get('count') || 0) + 1
                });
            }, 2000);
        });
    },
    increase() {
        let count = this.get('count') || 0;
        return Promise.resolve({
            count: count + 1
        });
    },
    share(rnd) {
        return Promise.resolve({
            share: rnd
        });
    }
});