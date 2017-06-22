/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Store = require('@app/mixins/store');
module.exports = Store.extend({
    load() {
        let fields = [{
            id: 1,
            name: '示例字段1'
        }, {
            id: 2,
            name: '示例字段2'
        }, {
            id: 3,
            name: '示例字段3'
        }, {
            id: 4,
            name: '示例字段4'
        }, {
            id: 5,
            name: '示例字段5'
        }, {
            id: 6,
            name: '示例字段6'
        }];
        let fieldsMap = Magix.toMap(fields, 'id');
        let checked = [1, 5, 6];
        return Promise.resolve({
            fields,
            checked,
            fieldsMap
        });
    },
    save(checked) {
        return Promise.resolve({
            checked: checked
        });
    }
});