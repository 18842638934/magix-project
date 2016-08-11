define('coms/inputag/index',['magix','$','../monitor/index'],function(require,exports,module){
/*Magix ,$ ,Monitor */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mx-752',".mx-752-tags{background:#fff;border:1px solid #ddd;width:330px;cursor:text;padding:2px;position:relative;overflow:hidden}.mx-752-ipt{height:16px;line-height:16px;border:none;outline:none;width:100%;font-size:12px}.mx-752-fl{float:left}.mx-752-item{display:inline-block;border-radius:4px;background:#eee;margin:1px 2px}.mx-752-item,.mx-752-name{overflow:hidden}.mx-752-name{float:left;border-right:1px solid #fff;padding:2px 4px;max-width:140px}.mx-752-delete{width:20px;float:left;height:18px;line-height:18px;text-align:center;cursor:pointer}.mx-752-list{width:336px;overflow:auto;position:absolute;background:#eee;z-index:1}.mx-752-none{display:none}.mx-752-li{height:21px;line-height:21px;padding:2px 8px;border-radius:2px;user-select:none;-webkit-user-select:none;-moz-user-select:none;cursor:default}.mx-752-over{background-color:#6363e6;background-image:-webkit-linear-gradient(top,#1b87e3 2%,#6363e6 98%);background-image:linear-gradient(180deg,#1b87e3 2%,#6363e6 98%);color:#ecf2f8;text-shadow:0 -1px 0 rgba(0,0,0,.05)}");
var CSSNames = {"tags":"mx-752-tags","ipt":"mx-752-ipt","fl":"mx-752-fl","item":"mx-752-item","name":"mx-752-name","delete":"mx-752-delete","list":"mx-752-list","none":"mx-752-none","li":"mx-752-li","over":"mx-752-over"};
var $ = require('$');
var Monitor = require('../monitor/index');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div class=\"mx-752-tags clearfix\" id=\"tags_<%=id%>\" mx-click=\"showList()\" mx-guid=\"x7141-\u001f\">@1-\u001f</div><div class=\"mx-752-list mx-752-none\" id=\"list_<%=id%>\"><ul mx-guid=\"x7142-\u001f\">@2-\u001f</ul></div>","subs":[{"guid":1,"keys":["selected"],"tmpl":"<%for(var i=0;i<selected.length;i++){%><div class=\"mx-752-item\" id=\"si_<%=i%>_<%=id%>\" title=\"<%=selected[i]%>\"><div class=\"mx-752-name ellipsis\"><%=selected[i]%></div><div class=\"mx-752-delete\" mx-click=\"remove({index:<%=i%>})\">x</div></div><%}%><div class=\"mx-752-item\" id=\"iptw_<%=id%>\"><input id=\"ipt_<%=id%>\" class=\"mx-752-ipt\" mx-keyup=\"search()\" mx-paste=\"search()\" value=\"<%=iptValue%>\"/></div>","selector":"div[mx-guid=\"x7141-\u001f\"]"},{"guid":2,"keys":["list"],"tmpl":"<%for(var i=0;i<list.length;i++){%><li id=\"idx_<%=i%>\" class=\"mx-752-li ellipsis\" mx-mouseout=\"hover()\" mx-mouseover=\"hover()\" mx-click=\"fill({text:'<%=list[i].text%>'})\" data-text=\"<%=list[i].text%>\"><%=list[i].text%></li><%}%>","selector":"ul[mx-guid=\"x7142-\u001f\"]"}]},
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
            selected: me.$selected,
            list: me.$list
        }).digest();
        me.updateInputWidth();
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
    'hover<mouseover,mouseout>': function(e) {
        $(e.current)[e.type == 'mouseout' ? 'removeClass' : 'addClass'](CSSNames.over);
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
    'fill<click>': function(e) {
        var data = this.$updater;
        var text = e.params.text;
        var selected = data.get('selected');
        var me = this;
        selected.push(text);
        data.set({
            selected: selected
        }).digest();
        me.updateInputWidth();
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