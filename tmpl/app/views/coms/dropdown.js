/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@dropdown.css');
var PMap = {
    '': [{
        text: '请选择城市',
        id: ''
    }],
    'hn': [{
        "id": "zz",
        "text": "郑州"
    }],
    'zj': [{
        "id": "hz",
        "text": "杭州"
    }]
};
module.exports = Magix.View.extend({
    tmpl: '@dropdown.html',
    tmplData: '@dropdown.html:data',
    ctor: function() {
        var me = this;
        var big = [];
        for (var i = 0; i < 200000; i++) {
            big.push({
                id: i,
                text: i + ':' + Math.random()
            });
        }
        me.$big = big;
        me.$updater.set({
            viewId: me.id
        });
        me.observe('d2Id');

        //me.render();
    },
    render: function(name) {
        var me = this;
        var loc = Magix.Router.parse();
        me.request('render').all(name || 'list', function(err, bag) {
            me.$updater.set({
                list: bag.get('data', []),
                d2Id: loc.params.d2Id || 21,
                citySelected: '',
                cities: [{
                    text: '请选择城市',
                    id: ''
                }],
                big: me.$big,
                provinces: [{
                    "id": "",
                    "text": "请选择省份"
                }, {
                    "id": "zj",
                    "text": "浙江"
                }, {
                    "id": "hn",
                    "text": "河南"
                }]
            }).digest();
        });
    },
    'changeService<click>': function() {
        this.render('list1');
    },
    'd2Change<change>': function(e) {
        Magix.Router.to({
            d2Id: e.value
        });
    },
    'pChg<change>': function(e) {
        var cities = PMap[e.value];
        this.$updater.set({
            cities: cities
        }).digest();
    }
});