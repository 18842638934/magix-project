/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@agreement.css');
module.exports = Magix.View.extend({
    tmpl: '@agreement.html',
    init(extra) {
        this.$dialog = extra.dialog;
    },
    render: function() {
        let me = this;
        me.updater.digest();
    },
    'enter<click>' () {
        this.$dialog.close();
    }
}, {
    dialogOptions: {
        width: 800
    }
});