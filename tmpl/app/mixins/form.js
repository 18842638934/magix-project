let $ = require('$');
let Magix = require('magix');
module.exports = {
    getDataByKeys(data, keys) {
        keys = (keys + '').split(',');
        var r = {};
        for (var i = 0, key; i < keys.length; i++) {
            key = keys[i];
            r[key] = Magix.has(data, key) ? data[key] : '';
        }
        return r;
    },
    'syncValue<change,input>' (e) {
        let me = this;
        let params = e.params;
        let updater = me.updater;
        let keys = updater.$keys;
        let object = updater.get();
        let ps = params.p.split('.');
        let flags = e.params.f;
        let actions = {};
        if (flags) {
            actions = Magix.toMap(flags.split(','));
        }
        let key = ps.pop(),
            temp, node = $(e.eventTarget),
            value,
            rootKey;
        while (object && ps.length) {
            temp = ps.shift();
            if (!rootKey) rootKey = temp; //解决设置数据后，再调用updater.digest()不刷新的问题
            object = object[temp];
        }
        rootKey = rootKey || key;
        //需要完善checkbox
        if (node.prop('type') == 'checkbox') {
            let src = object[key];
            let checked = node.prop('checked');
            value = node.val();
            if (src === true || src === false) {
                value = checked;
            } else if (Array.isArray(src)) {
                if (checked) {
                    src.push(value);
                } else {
                    let idx = src.indexOf(value);
                    if (idx > -1) {
                        src.splice(idx, 1);
                    }
                }
                value = src;
            } else if ($.isPlainObject(src)) {
                if (checked) {
                    src[value] = value;
                } else {
                    delete src[value];
                }
                value = src;
            } else {
                value = checked ? node.val() : '';
            }
        } else {
            value = node.val();
        }
        if (actions.number) {
            value = parseFloat(value);
        }
        if (object) {
            object[key] = value;
            keys[rootKey] = 1; //标记改变;
        } else {
            console.warn(params.p);
        }
        if (params.m) {
            let name = params.m + '\u001e' + e.type;
            if (me[name]) {
                e.params = params.a;
                me[name](e);
            }
        }
        if (actions.refresh) {
            updater.digest();
        }
    }
};