define('coms/inputag/tree',['magix','$','../monitor/index','../generic/treeable'],function(require,exports,module){
/*Magix ,$ ,Monitor ,ListToTree */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mx-9ad',".mx-9ad-tags{background:#fff;border:1px solid #ddd;width:330px;cursor:text;padding:2px;position:relative;overflow:hidden}.mx-9ad-ipt{height:16px;line-height:16px;border:none;outline:none;width:100%;font-size:12px}.mx-9ad-fl{float:left}.mx-9ad-item{display:inline-block;border-radius:4px;background:#eee;margin:1px 2px}.mx-9ad-item,.mx-9ad-name{overflow:hidden}.mx-9ad-name{float:left;border-right:1px solid #fff;padding:2px 4px;max-width:140px}.mx-9ad-delete{width:20px;float:left;height:18px;line-height:18px;text-align:center;cursor:pointer}.mx-9ad-none{display:none}.mx-9ad-tree{width:336px;overflow:auto;position:absolute;background:#eee;z-index:1}.mx-9ad-indent{margin-left:22px;border-left:1px dotted #ccc}.mx-9ad-li{padding:0 4px}.mx-9ad-icon,.mx-9ad-li{line-height:22px}.mx-9ad-icon{width:22px;height:22px;float:left;text-align:center;font-weight:800}.mx-9ad-cp{cursor:pointer}.mx-9ad-tree-name{padding:4px;border-radius:5px}.mx-9ad-over{background-color:#6363e6;background-image:-webkit-linear-gradient(top,#1b87e3 2%,#6363e6 98%);background-image:linear-gradient(180deg,#1b87e3 2%,#6363e6 98%);color:#ecf2f8;text-shadow:0 -1px 0 rgba(0,0,0,.05)}");
var CSSNames = {"tags":"mx-9ad-tags","ipt":"mx-9ad-ipt","fl":"mx-9ad-fl","item":"mx-9ad-item","name":"mx-9ad-name","delete":"mx-9ad-delete","none":"mx-9ad-none","tree":"mx-9ad-tree","indent":"mx-9ad-indent","li":"mx-9ad-li","icon":"mx-9ad-icon","cp":"mx-9ad-cp","tree-name":"mx-9ad-tree-name","over":"mx-9ad-over"};
var $ = require('$');
var Monitor = require('../monitor/index');
var ListToTree = require('../generic/treeable');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div class=\"mx-9ad-tags clearfix\" id=\"tags_<%=id%>\" mx-click=\"showList()\" mx-guid=\"x9451-\u001f\">@1-\u001f</div><div class=\"mx-9ad-tree mx-9ad-none\" id=\"list_<%=id%>\"></div>","subs":[{"guid":1,"keys":["selected"],"tmpl":"<%for(var i=0;i<selected.length;i++){%><div class=\"mx-9ad-item\" id=\"si_<%=i%>_<%=id%>\" title=\"<%=selected[i]%>\"><div class=\"mx-9ad-name ellipsis\"><%=selected[i]%></div><div class=\"mx-9ad-delete\" mx-click=\"remove({index:<%=i%>})\">x</div></div><%}%><div class=\"mx-9ad-item\" id=\"iptw_<%=id%>\"><input id=\"ipt_<%=id%>\" class=\"mx-9ad-ipt\" mx-keyup=\"search()\" mx-paste=\"search()\" value=\"<%=iptValue%>\"/></div>","selector":"div[mx-guid=\"x9451-\u001f\"]"}]},
    ctor: function(extra) {
        Monitor.setup();
        var me = this;
        me.on('destroy', Monitor.teardown);
        me.$list = extra.list;
        me.$selected = extra.selected;
    },
    inside: function(node) {
        var me = this;
        return Magix.inside(node, 'list_' + me.id) ||
            Magix.inside(node, 'tags_' + me.id);
    },
    render: function() {
        var me = this;
        me.$updater.set({
            iptValue: '',
            id: me.id,
            selected: me.$selected
        }).digest();
        var info = ListToTree(me.$list, 'id', 'pId');
        me.$info = info;
        me.owner.mountVframe('list_' + me.id, 'coms/inputag/branch', {
            id: 'id',
            pId: 'pId',
            text: 'text'
        });
        me.updateInputWidth();
    },
    getInfo: function() {
        var me = this;
        return {
            list: me.$info.list,
            onClick: function(e) {
                var data = me.$updater;
                var text = e.text;
                var selected = data.get('selected');
                selected.push(text);
                data.set({
                    selected: selected
                }).digest();
                me.updateInputWidth();
                me.focusInput();
            }
        };
    },
    hide: function() {
        var me = this;
        if (me.$shown) {
            me.$shown = false;
            Monitor.remove(me);
            $('#list_' + me.id).addClass(CSSNames.none);
        }
    },
    updateInputWidth: function() {
        var me = this;
        var last = $('#iptw_' + me.id);
        last.width(20);
        var left = last.position().left;
        var width = 330 - left - 30;
        last.width(width > 20 ? width : 20);
    },
    focusInput: function() {
        var ipt = Magix.node('ipt_' + this.id);
        ipt.select();
        if (ipt.setSelectionRange) {
            ipt.setSelectionRange(ipt.value.length, ipt.value.length);
        }
        ipt.focus();
    },
    'showList<click>': function() {
        var me = this;
        if (!me.$shown) {
            me.$shown = true;
            Monitor.add(me);
            $('#list_' + me.id).removeClass(CSSNames.none);
        }
        me.focusInput();
    },
    'search<keyup,paste>': function(e) {
        var me = this;
        clearTimeout(me.$timer);
        var data = me.$updater;
        var lastValue = data.get('iptValue');
        me.$timer = setTimeout(me.wrapAsync(function() {
            var newList = [];
            var val = e.current.value;
            var list = me.$list;
            if (val != data.get('iptValue')) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].text.indexOf(val) >= 0) {
                        newList.push(list[i]);
                    }
                }
                data.set({
                    iptValue: val,
                    list: newList
                }).digest();
            }
        }), 150);

        if (e.type == 'keyup' && e.keyCode == 8 && !lastValue) {
            var selected = me.data.get('selected');
            selected.pop();
            me.data.digest();
            me.updateInputWidth();
            me.focusInput();
        }
    },
    'remove<click>': function(e) {
        e.stopPropagation();
        var me = this;
        var selected = me.$updater.get('selected');
        selected.splice(e.params.index, 1);
        me.$updater.digest({
            selected: selected
        });
        me.hide();
        me.updateInputWidth();
    }
});
});