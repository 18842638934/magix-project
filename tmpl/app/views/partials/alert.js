'#snippet';
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@alert.html',
    init(extra) {
        let me = this;
        me.$dialog = extra.dialog;
        me.$body = extra.body;
        me.$title = extra.title || '提示';
        me.$enterCallback = extra.enterCallback;
    },
    render() {
        let me = this;
        me.updater.digest({
            body: me.$body,
            title: me.$title
        });
    },
    'enter<click>' () {
        let me = this;
        if (me.$enterCallback) {
            Magix.toTry(me.$enterCallback);
        }
        me.$dialog.close();
    }
});