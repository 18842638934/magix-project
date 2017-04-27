/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Dialog = require('@app/mixins/dialog');
let GTip = require('@app/mixins/gtip');
Magix.applyStyle('@dialog.css');
module.exports = Magix.View.extend({
    tmpl: '@dialog.html',
    mixins: [Dialog, GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'alert<click>' (e) {
        this.alert(e.eventTarget.innerHTML);
    },
    'alertCallback<click>' (e) {
        this.alert(e.eventTarget.innerHTML, () => {
            this.gtipRT('确定按钮被点击');
        });
    },
    'alertTitle<click>' (e) {
        this.alert(e.eventTarget.innerHTML, null, '这是提示标题');
    },
    'confirm<click>' (e) {
        this.confirm(e.eventTarget.innerHTML);
    },
    'confirmCallback<click>' (e) {
        this.confirm(e.eventTarget.innerHTML, () => {
            this.gtipRT('确定按钮被点击');
        });
    },
    'confirmCancelCallback<click>' (e) {
        this.confirm(e.eventTarget.innerHTML, () => {
            this.gtipRT('确定按钮被点击');
        }, () => {
            this.gtipRT('取消按钮被点击');
        });
    },
    'confirmTitle<click>' (e) {
        this.confirm(e.eventTarget.innerHTML, () => {
            this.gtipRT('确定按钮被点击');
        }, () => {
            this.gtipRT('取消按钮被点击');
        }, '这是提示标题');
    },
    'agreement<click>' () {
        this.mxDialog('@../partials/agreement');
    }
});