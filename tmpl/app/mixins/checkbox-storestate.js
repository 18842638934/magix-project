/*
    author:xinglie.lkf@alibaba-inc.com
 */
let $ = require('$');
let Magix = require('magix');
module.exports = {
    ctor() {
        let me = this;
        me.$stateStore = {};
        me.on('rendered', me.applyState);
    },
    applyState(e) {
        let me = this;
        let state = me.$stateStore;
        let ipts = $('#' + e.id + ' input[linkage-parent-name]');
        ipts.each((idx, item) => {
            let linkName = $(item).attr('linkage-parent-name');
            let object = state[linkName];
            if (object && object[item.value] == 1) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    },
    getStoreState(key) {
        let store = this.$stateStore;
        let keys = [];
        let value;
        if (key) {
            value = store[key];
            if (value) {
                keys = Magix.keys(value);
            }
        } else {
            for (let p in store) {
                value = store[p];
                if (value) {
                    keys = keys.concat(Magix.keys(value));
                }
            }
        }
        return keys;
    },
    '$input[linkage-parent-name]<change>' (e) {
        let me = this;
        let node = $(e.eventTarget);
        let value = node.val();
        let linkName = node.attr('linkage-parent-name');
        if (value) {
            let object = me.$stateStore[linkName];
            if (!object) {
                object = me.$stateStore[linkName] = {};
            }
            if (node.prop('checked')) {
                object[value] = 1;
            } else {
                delete object[value];
            }
        }
    },
    '$input[linkage-name]<change>' (e) {
        let me = this;
        let linkName = $(e.eventTarget).attr('linkage-name');
        let object = me.$stateStore[linkName];
        if (!object) {
            object = me.$stateStore[linkName] = {};
        }
        $('#' + me.id + ' input[type=checkbox]').each((index, input) => {
            input = $(input);
            let tempName = input.attr('linkage-parent-name');
            let value = input.val();
            if (value && tempName == linkName) {
                if (e.target.checked) {
                    object[value] = 1;
                } else {
                    delete object[value];
                }
            }
        });
    }
};