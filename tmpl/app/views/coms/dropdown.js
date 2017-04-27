/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@dropdown.css');
let GTip = require('@app/mixins/gtip');
let Provinces = [{
    'id': 'zj',
    'text': '浙江'
}, {
    'id': 'hn',
    'text': '河南'
}];
let PMap = {
    'hn': [{
        'id': 'zz',
        'text': '郑州'
    }],
    'zj': [{
        'id': 'hz',
        'text': '杭州'
    }]
};
module.exports = Magix.View.extend({
    tmpl: '@dropdown.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest({
            provinces: Provinces,
            cities: [{id:'',text:'请选择城市'}]
        });
    },
    'showValue<change>' (e) {
        this.gtipRT('text:' + e.text + ',value:' + e.value);
        if (e.params.p) {
            this.updater.digest({
                cities: PMap[e.value] || [{id:'',text:'请选择城市'}]
            });
        }
    }
});