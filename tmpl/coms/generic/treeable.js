/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = function(list, id, pId) {
    if (!list._psrd) {
        list._psrd = 1;
        id = id || 'id';
        pId = pId || 'pId';
        var map = {},
            listMap = {},
            rootList = [];
        for (var i = 0, max = list.length; i < max; i++) {
            var one = Magix.mix({}, list[i]);
            map[one[id]] = one;
            if (listMap[one[id]]) {
                one.children = listMap[one[id]];
            }
            if (one[pId]) {
                if (map[one[pId]]) {
                    var c = map[one[pId]].children || (map[one[pId]].children = []);
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