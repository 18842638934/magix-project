define('app/views/coms/dropdown',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mx-5bd',".mx-5bd-dropdown{height:36px;float:left;margin:0 8px}.mx-5bd-bottom{position:absolute;bottom:0;left:400px}.mx-5bd-wrapper{margin:50px}");
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
    tmpl: "<div class=\"mx-5bd-wrapper\"><div id=\"d1_<%=viewId%>\" mx-view=\"coms/dropdown/index?width=200&list={list}\" class=\"mx-5bd-dropdown\"></div><div id=\"d2_<%=viewId%>\" class=\"mx-5bd-dropdown\" mx-view=\"coms/dropdown/index?list={list}&selected={d2Id}&search=true&height=100\" mx-change=\"d2Change()\" mx-guid=\"x1b51-\u001f\"></div><button mx-click=\"changeService()\" class=\"btn btn-size25\">切换数据源</button><div id=\"d3_<%=viewId%>\" class=\"mx-5bd-dropdown mx-5bd-bottom\" mx-view=\"coms/dropdown/index?list={list}\"></div><div id=\"d4_<%=viewId%>\" class=\"mx-5bd-dropdown\" mx-view=\"coms/dropdown/index?list={list}&search=true\"></div><div class=\"mx-5bd-dropdown\" mx-view=\"coms/dropdown/index?list={list}&selected={d2Id}\" mx-guid=\"x1b52-\u001f\"></div><br/><div class=\"mx-5bd-dropdown\" id=\"p_<%=viewId%>\" mx-view=\"coms/dropdown/index?list={provinces}&selected=\" mx-change=\"pChg()\"></div><div class=\"mx-5bd-dropdown\" mx-view=\"coms/dropdown/index?list={cities}\" mx-guid=\"x1b53-\u001f\"></div></div>",
    tmplData: [{"keys":["d2Id"],"selector":"div[mx-guid=\"x1b51-\u001f\"]","view":"coms/dropdown/index?list={list}&selected={d2Id}&search=true&height=100"},{"keys":["d2Id"],"selector":"div[mx-guid=\"x1b52-\u001f\"]","view":"coms/dropdown/index?list={list}&selected={d2Id}"},{"keys":["cities"],"selector":"div[mx-guid=\"x1b53-\u001f\"]","view":"coms/dropdown/index?list={cities}"}],
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
});