define('coms/updater/index',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var HolderReg = /\u001f/g;
var ContentReg = /@(\d+)\-\u001f/g;
var Stringify = JSON.stringify;
var Update = function(host, changed, updateFlags, renderData) {
    var view = host.$v;
    var info = host.$i;
    var selfId = view.id;
    var build = function(tmpl, data) {
        return info.build(tmpl, data).replace(HolderReg, selfId);
    };
    var tmpl = info.tmpl;
    var tmplData = info.data;
    if (changed || !host.$rd) {
        var list = tmplData;
        if (host.$rd && updateFlags && list) {
            var updatedNodes = {},
                keys;
            var one, updateTmpl, updateAttrs;
            var updateNode = function(node) {
                var id = node.id || (node.id = Magix.guid('n'));
                if (!updatedNodes[id]) {
                    //console.time('update:' + id);
                    updatedNodes[id] = 1;
                    var vf = one.view && Magix.Vframe.get(id);
                    if (updateAttrs) {
                        for (var i = one.attrs.length - 1; i >= 0; i--) {
                            var attr = one.attrs[i];
                            var val = build(attr.v, renderData);
                            if (attr.p) {
                                node[attr.n] = val;
                            } else {
                                node.setAttribute(attr.n, val);
                            }
                        }
                    }
                    if (vf) {
                        vf.unmountView();
                    }
                    if (one.tmpl && updateTmpl) {
                        view.setHTML(id, build(one.tmpl, renderData));
                    }
                    if (vf) {
                        vf.mountView(build(one.view, renderData));
                    }
                    //console.timeEnd('update:' + id);
                }
            };
            console.log(updateFlags);
            for (var i = list.length - 1, update, q, mask, m; i >= 0; i--) { //keys
                updateTmpl = 0;
                updateAttrs = 0;
                one = list[i];
                update = 1;
                mask = one.mask;
                keys = one.pKeys;
                if (keys) {
                    q = keys.length;
                    while (--q >= 0) {
                        if (Magix.has(updateFlags, keys[q])) {
                            update = 0;
                            break;
                        }
                    }
                }
                if (update) {
                    keys = one.keys;
                    q = keys.length;
                    update = 0;
                    while (--q >= 0) {
                        if (Magix.has(updateFlags, keys[q])) {
                            update = 1;
                            if (!mask || (updateTmpl && updateAttrs)) {
                                updateTmpl = one.tmpl;
                                updateAttrs = one.attrs;
                                break;
                            }
                            m = mask.charAt(q);
                            updateTmpl = updateTmpl || m & 1;
                            updateAttrs = updateAttrs || m & 2;
                        }
                    }
                    if (update) {
                        update = '#' + selfId + ' ' + one.selector.replace(HolderReg, selfId);
                        var nodes = document.querySelectorAll(update);
                        q = 0;
                        while (q < nodes.length) {
                            updateNode(nodes[q++]);
                        }
                    }
                }
            }
        } else {
            var map,
                tmplment = function(m, guid) {
                    return map[guid].tmpl;
                },
                x;
            if (list) {
                if (!list.$) { //process once
                    list.$ = map = {};
                    x = list.length;
                    while (x > 0) {
                        var s = list[--x];
                        if (s.guid) {
                            map[s.guid] = s;
                            s.tmpl = s.tmpl.replace(ContentReg, tmplment);
                            delete s.guid;
                        }
                    }
                }
                map = list.$;
            }
            host.$rd = 1;
            var str = tmpl.replace(ContentReg, tmplment);
            view.setHTML(selfId, build(str, renderData));
        }
    }
};
var Updater = function(view, ops) {
    var me = this;
    me.$i = ops;
    me.$v = view;
    me.$data = {};
    me.$json = {};
};
var UP = Updater.prototype;
Magix.mix(UP, Magix.Event);
Magix.mix(UP, {
    get: function(key) {
        var result = this.$data;
        if (key) result = result[key];
        return result;
    },
    set: function(obj) {
        var me = this;
        Magix.mix(me.$data, obj);
        return me;
    },
    digest: function() {
        var me = this;
        var data = me.$data;
        var json = me.$json;
        var keys = {};
        var changed, val, key, valJSON, lchange;
        for (key in data) {
            val = data[key];
            lchange = 0;
            valJSON = Stringify(val);
            if (!Magix.has(json, key)) {
                json[key] = valJSON;
                lchange = 1;
            } else {
                lchange = valJSON != json[key];
                json[key] = valJSON;
            }
            if (lchange) {
                keys[key] = changed = 1;
            }
        }
        Update(me, changed, keys, data);
        if (changed) {
            me.fire('changed', {
                keys: keys
            });
            delete me.$lss;
        }
        return me;
    },
    snapshot: function() {
        var me = this;
        me.$ss = Stringify(me.$json);
        return me;
    },
    altered: function() {
        var me = this;
        if (me.$ss) { //存在快照
            if (!me.$lss) me.$lss = JSON.stringify(me.$json); //不存在比较的快照，生成
            return me.$ss != me.$lss; //比较2次快照是否一样
        }
        return true;
    }
});
module.exports = Updater;
});