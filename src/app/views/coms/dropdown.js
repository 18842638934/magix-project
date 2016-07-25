define('app/views/coms/dropdown',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mp-5bd',".mp-5bd-dropdown{height:36px;float:left;margin:0 8px}.mp-5bd-bottom{position:absolute;bottom:0;left:400px}.mp-5bd-wrapper{margin:50px}");
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
    tmpl: "<div class=\"mp-5bd-wrapper\"><div id=\"d1_<%=viewId%>\" mx-view=\"coms/dropdown/index\" class=\"mp-5bd-dropdown\"><script type=\"magix/config\"><%=JSON.stringify({list:list,width:200})%></script></div><div id=\"d2_<%=viewId%>\" class=\"mp-5bd-dropdown\" mx-view=\"coms/dropdown/index\" mx-change=\"d2Change()\" mx-guid=\"x1b51-\u001f\">@1-\u001f</div><button mx-click=\"changeService()\" class=\"btn btn-size25\">切换数据源</button><div id=\"d3_<%=viewId%>\" class=\"mp-5bd-dropdown mp-5bd-bottom\" mx-view=\"coms/dropdown/index\"><script type=\"magix/config\"><%=JSON.stringify({list:list})%></script></div><div id=\"d4_<%=viewId%>\" class=\"mp-5bd-dropdown\" mx-view=\"coms/dropdown/index\"><script type=\"magix/config\"><%=JSON.stringify({list:list,search:true})%></script></div><div class=\"mp-5bd-dropdown\" mx-view=\"coms/dropdown/index\" mx-guid=\"x1b52-\u001f\">@2-\u001f</div><br/><div class=\"mp-5bd-dropdown\" id=\"p_<%=viewId%>\" mx-view=\"coms/dropdown/index\" mx-change=\"pChg()\"><script type=\"magix/config\"><%=JSON.stringify({list:provinces,selected:''})%></script></div><div class=\"mp-5bd-dropdown\" mx-view=\"coms/dropdown/index\" mx-guid=\"x1b53-\u001f\">@3-\u001f</div></div>",
    tmplData: [{"guid":1,"keys":["d2Id"],"tmpl":"<script type=\"magix/config\"><%=JSON.stringify({list:list,selected:d2Id,search:true,height:100})%></script>","selector":"div[mx-guid=\"x1b51-\u001f\"]","view":"coms/dropdown/index"},{"guid":2,"keys":["d2Id"],"tmpl":"<script type=\"magix/config\"><%=JSON.stringify({list:list,selected:d2Id})%></script>","selector":"div[mx-guid=\"x1b52-\u001f\"]","view":"coms/dropdown/index"},{"guid":3,"keys":["cities"],"tmpl":"<script type=\"magix/config\"><%=JSON.stringify({list:cities})%></script>","selector":"div[mx-guid=\"x1b53-\u001f\"]","view":"coms/dropdown/index"}],
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