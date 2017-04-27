/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@taginput.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@taginput.html',
    mixins: [GTip],
    render() {
        let me = this;
        let list1 = ['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8', '分类9', '分类10'];
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
        me.updater.digest({
            list1,
            list2
        });
    },
    'showSelected<change>' (e) {
        console.log(e);
        this.gtipRT('选中的ids:' + e.ids);
    }
});