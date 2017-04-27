/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@hourpicker.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@hourpicker.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'setCore<click>' (e) {
        let vframe = $('#core').prop('vframe');
        vframe.invoke('val', [e.params.range]);
    },
    'showCore<change>' (e) {
        this.gtipRB('核心小时选中：' + e.range);
    },
    'setDay<click>' (e) {
        let vframe = $('#day').prop('vframe');
        vframe.invoke('val', [e.params.range]);
    },
    'showDay<change>' (e) {
        this.gtipRB('天小时选中：' + e.range);
    },
    'setWeek<click>' () {
        let vframe = $('#week').prop('vframe');
        vframe.invoke('val', [['', '', '00000011', '', '0000000000000111111']]);
    },
    'showWeek<click>' () {
        let vframe = $('#week').prop('vframe');
        let val = vframe.invoke('val');
        this.gtipRB('周选中：' + val);
    }
});