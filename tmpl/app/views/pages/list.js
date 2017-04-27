/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let CheckboxLinkage = require('@app/mixins/checkbox-linkage');
let CheckboxStorestate = require('@app/mixins/checkbox-storestate');
Magix.applyStyle('@list.css');
module.exports = Magix.View.extend({
    tmpl: '@list.html',
    mixins: [CheckboxLinkage, CheckboxStorestate],
    init() {
        let headers = [];
        for (let i = 0; i < 5; i++) {
            headers[i] = '示例字段' + i;
        }
        let list = [];
        for (let j = 0; j < 100; j++) {
            let temp = {
                id: j
            };
            for (let i = 0; i < 5; i++) {
                temp['f' + i] = '字段内容' + j + '_' + i;
            }
            list.push(temp);
        }
        let me = this;
        me.$headers = headers;
        me.$list = list;
        me.observe('page,size');
    },
    getInfo() {
        let loc = Magix.Router.parse();
        let page = loc.get('page') || 1;
        let size = loc.get('size') || 10;
        let list = this.$list.slice(size * (page - 1), size * page);
        return {
            total: 100,
            headers: this.$headers,
            list,
            page,
            size
        };
    },
    render() {
        let me = this;
        let info = me.getInfo();
        me.updater.digest(info);
    },
    'changePage<change>' (e) {
        Magix.Router.to({
            page: e.state.page,
            size: e.state.size
        });
    }
});