/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@copy.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@copy.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'copy<success>' () {
        this.gtipRT('复制成功，可以粘贴了～');
    }
});