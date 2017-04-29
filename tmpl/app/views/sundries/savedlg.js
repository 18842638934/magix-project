/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@savedlg.html',
    init(extra) {
        var me = this;
        me.$dialog = extra.dialog;
        me.$body = extra.body;
        me.$title = extra.title || '提示';
        me.$enterCallback = extra.enterCallback;
        me.$cancelCallback = extra.cancelCallback;
    },
    render() {
        var me = this;
        me.updater.digest({
            body: me.$body,
            title: me.$title
        });
    },
    'enter<click>' (e) {
        var me = this;
        if (me.$enterCallback) {
            Magix.toTry(me.$enterCallback, [e.params.save]);
        }
        me.$dialog.close();
    },
    'cancel<click>' () {
        var me = this;
        if (me.$cancelCallback) {
            Magix.toTry(me.$cancelCallback);
        }
        me.$dialog.close();
    }
}, {
    dialogOptions: {
        closable: false
    }
});