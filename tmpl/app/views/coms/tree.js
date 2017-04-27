/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@tree.css');
let Service = require('@app/services/service');
module.exports = Magix.View.extend({
    tmpl: '@tree.html',
    mixins: [Service],
    render() {
        let me = this;
        me.request().all(['list', 'code'], function(err, bag, code) {
            me.updater.digest({
                id: me.id,
                list1: bag.get('data', []),
                list2: code.get('data', [])
            });
        });
    }
});