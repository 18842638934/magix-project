/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@checkbox.css');
let CheckboxLinkage = require('@app/mixins/checkbox-linkage');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@checkbox.html',
    mixins: [CheckboxLinkage, GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'showEx1<click>' () {
        let list = this.getSelectedIds('example1');
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    },
    'showEx2<click>' () {
        let list = this.getSelectedIds('example2');
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    },
    'show<click>' () {
        let list = this.getSelectedIds();
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    }
});