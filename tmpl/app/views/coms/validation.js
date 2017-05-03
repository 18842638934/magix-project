/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@validation.less');
let $ = require('$');
let Dialog = require('@app/mixins/dialog');
module.exports = Magix.View.extend({
    tmpl: '@validation.html',
    mixins: [Dialog],
    render() {
        let me = this;
        me.updater.digest();
    },
    'save<click>' () {
        let vf = $('#' + this.id + ' form').prop('vframe');
        if (vf.invoke('isValid')) {
            this.alert('恭喜～校验通过');
        } else {
            this.alert('校验未通过，请修改');
        }
    }
});
