/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@store-table-settings.css');
let TableStore = require('./store-table-store');
let Form = require('@app/mixins/form');
let $ = require('$');
module.exports = Magix.View.extend({
    tmpl: '@store-table-settings.html',
    mixins: [TableStore, Form],
    render() {
        let me = this;
        me.store.set({
            viewId: me.id
        }).dispatch('load');
    },
    'save<click>' () {
        let me = this;
        let checked = [];
        $('#' + me.id + ' input[type="checkbox"]:checked').each((idx, item) => {
            checked.push(item.value | 0);
        });
        me.store.dispatch('save', checked);
        $('#settings_' + me.id).invokeView('hide');
    }
});