/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@colorpicker.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@colorpicker.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'show<pick>' (e) {
        this.gtipRT('选择的颜色：' + e.color);
    }
});