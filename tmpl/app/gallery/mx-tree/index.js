'top@./branch.js';
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let ListToTree = (list, id, pId) => {
    if (!list._psrd) {
        list._psrd = 1;
        id = id || 'id';
        pId = pId || 'pId';
        let map = {},
            listMap = {},
            rootList = [];
        for (let i = 0, max = list.length; i < max; i++) {
            let one = Magix.mix({}, list[i]);
            map[one[id]] = one;
            if (listMap[one[id]]) {
                one.children = listMap[one[id]];
            }
            if (one[pId]) {
                if (map[one[pId]]) {
                    let c = map[one[pId]].children || (map[one[pId]].children = []);
                    c.push(one);
                } else {
                    if (!listMap[one[pId]]) listMap[one[pId]] = [one];
                    else listMap[one[pId]].push(one);
                }
            } else {
                rootList.push(one);
            }
        }
        list.list = rootList;
        list.map = map;
    }
    return list;
};
Magix.applyStyle('@index.css');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.$extra = extra;
    },
    render: function() {
        let me = this;
        me.updater.digest({
            id: me.id
        });
        me.update(me.$extra);
    },
    update(ops) {
        let me = this;
        let info = ListToTree(ops.list, ops.idKey, ops.parentKey);
        me.$info = info;
        me.owner.mountVframe('tree_' + me.id, '@./branch', {
            id: ops.id || 'id',
            fromTop: true,
            pId: ops.parentKey,
            text: ops.textKey,
            list: info.list
        });
    }
});