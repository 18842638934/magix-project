/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Dialog = require('@app/mixins/dialog');
module.exports = Magix.View.extend({
    tmpl: '@leavedlg.html',
    mixins: [Dialog],
    render() {
        let me = this;
        me.updater.digest();
    },
    'openDlg<click>' () {
        this.mxDialog('@./dlg');
    }
});