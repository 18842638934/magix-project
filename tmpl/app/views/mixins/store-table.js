/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let CheckboxLinkage = require('@app/mixins/checkbox-linkage');
let TableStore = require('./store-table-store');
module.exports = Magix.View.extend({
    tmpl: '@store-table.html',
    mixins: [CheckboxLinkage, TableStore],
    render() {
        let me = this;
        me.store.set({
            content: Math.random()
        }).dispatch('load');
    }
});