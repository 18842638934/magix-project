/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Form = require('@app/mixins/form');
let Dialog = require('@app/mixins/dialog');
let list2 = [{
    id: 1,
    text: '分类1'
}, {
    id: 2,
    text: '分类2'
}, {
    id: 3,
    text: '分类3'
}, {
    id: 4,
    text: '分类4'
}, {
    id: 5,
    text: '分类5'
}, {
    id: 6,
    text: '分类6'
}, {
    id: 7,
    text: '分类7'
}, {
    id: 8,
    text: '分类8'
}, {
    id: 9,
    text: '分类9'
}, {
    id: 10,
    text: '分类10'
}, {
    id: 11,
    text: '分类11'
}, {
    id: 12,
    text: '分类12'
}, {
    id: 13,
    text: '分类13'
}, {
    id: 14,
    text: '分类14'
}, {
    id: 15,
    text: '分类15'
}];
module.exports = Magix.View.extend({
    tmpl: '@dlg.html',
    mixins: [Form, Dialog],
    init(extra) {
        this.$dialog = extra.dialog;
        this.leaveTip('弹框内表单有变化且未保存，确认离开吗？', () => {
            return this.updater.altered();
        });
    },
    leaveConfirm(msg, resolve, reject) {
        this.confirm(msg, resolve, reject);
    },
    render() {
        let me = this;
        me.updater.digest({
            rValue: 'test',
            list2,
            tags: '',
            date: '',
            color: '',
            dropdwon: ''
        }).snapshot();
    },
    'save<click>' () {
        //save
        this.updater.snapshot();
        this.$dialog.close();
    },
    'cancel<click>' () {
        this.$dialog.close();
    }
}, {
    dialogOptions: {
        width: 700
    }
});