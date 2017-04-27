/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@checkbox-storestate.css');
let CheckboxLinkage = require('@app/mixins/checkbox-linkage');
let CheckboxStorestate = require('@app/mixins/checkbox-storestate');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@checkbox-storestate.html',
    mixins: [CheckboxLinkage, GTip, CheckboxStorestate],
    init() {
        let headers = [];
        for (let i = 0; i < 5; i++) {
            headers[i] = '示例字段' + i;
        }
        let list1 = [],
            list2 = [];
        for (let j = 0; j < 100; j++) {
            let temp = {
                id: j
            };
            for (let i = 0; i < 5; i++) {
                temp['f' + i] = '字段内容' + j + '_' + i;
            }
            list1.push(temp);
            list2.push(temp);
        }
        let me = this;
        me.$headers = headers;
        me.$list1 = list1;
        me.$list2 = list2;
        me.$list1Page = 1;
        me.$list2Page = 1;
        me.$list1Size = 10;
        me.$list2Size = 10;
    },
    getList(type) {
        let me = this;
        let list = me['$' + type];
        let page = me['$' + type + 'Page'];
        let size = me['$' + type + 'Size'];
        return list.slice((page - 1) * size, page * size);
    },
    render() {
        let me = this;
        me.updater.digest({
            headers: me.$headers,
            list1: me.getList('list1'),
            list1Page: me.$list1Page,
            list1Size: me.$list1Size,
            list2: me.getList('list2')
        });
    },
    'chageList1<change>' (e) {
        let me = this;
        me.$list1Page = e.state.page;
        me.$list1Size = e.state.size;
        me.render();
    },
    'chageList2<change>' (e) {
        let me = this;
        me.$list2Page = e.state.page;
        me.$list2Size = e.state.size;
        me.render();
    },
    'showEx1<click>' () {
        let list = this.getStoreState('example1');
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    },
    'showEx2<click>' () {
        let list = this.getStoreState('example2');
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    },
    'show<click>' () {
        let list = this.getStoreState();
        if (list.length) {
            this.gtipRB('选中的值：' + list.join(','));
        } else {
            this.gtipRB('请选择checkbox');
        }
    }
});