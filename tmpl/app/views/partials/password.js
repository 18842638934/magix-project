/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Form = require('@app/mixins/form');
let Dialog = require('@app/mixins/dialog');
module.exports = Magix.View.extend({
    tmpl: '@password.html',
    mixins: [Form, Dialog],
    init(extra) {
        this.$dialog = extra.dialog;
    },
    render() {
        let me = this;
        me.updater.digest({
            viewId: me.id
        });
    },
    'enter<click>' () {
        let me = this;
        let vf = Magix.node('form_' + me.id).vframe;
        if (vf) {
            if (vf.invoke('isValid')) {
                let data = me.updater.get();
                let post = me.getDataByKeys(data, 'originalPasswd,passwd,repasswd');
                me.alert(JSON.stringify(post), () => {
                    me['cancel<click>']();
                });
            }
        }
    },
    'cancel<click>' () {
        this.$dialog.close();
    }
}, {
    dialogOptions: {
        width: 600
    }
});