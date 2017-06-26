/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Store = require('@app/mixins/store');
let TableStore = require('./store-table-store');
let TestStore = Store.extend({
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
    increase(type) {
        let count = this.get('count') || 0;
        return Promise.resolve({
            count: count + 1,
            type
        });
    },
    share(rnd) {
        return Promise.resolve({
            share: rnd
        });
    },
    test() {
        TableStore.dispatch('save', [1, 2, 3]).then((data) => {
            console.log(data);
        });
    }
});
setInterval(() => {
    TestStore.dispatch('increase', 'interval');
}, 2000);
module.exports = TestStore;