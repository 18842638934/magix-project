define('coms/dropdown/index',['magix','$','../monitor/index','../generic/xscroll'],function(require,exports,module){
/*Magix ,$ ,Monitor ,XScroll */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('mx-740',".mx-740-li{height:21px;line-height:21px;padding:2px 8px;border-radius:2px;user-select:none;-webkit-user-select:none;-moz-user-select:none;cursor:default}.mx-740-over{background-color:#6363e6;background-image:-webkit-linear-gradient(top,#1b87e3 2%,#6363e6 98%);background-image:linear-gradient(180deg,#1b87e3 2%,#6363e6 98%);color:#ecf2f8;text-shadow:0 -1px 0 rgba(0,0,0,.05)}.mx-740-selected{color:#ccc}.mx-740-header{position:relative;height:18px;line-height:18px;border:1px solid #ccc;border-radius:2px;padding:2px 8px 3px;user-select:none;-webkit-user-select:none;-moz-user-select:none;cursor:default}.mx-740-icon{position:absolute;right:5px;top:2px}.mx-740-ib{display:inline-block}.mx-740-header-active{color:#eee}.mx-740-list{max-height:200px;overflow:auto}.mx-740-items{position:absolute;z-index:50;padding:4px;border-radius:2px;background-color:#fff;color:#474747;box-shadow:0 4px 10px 0 rgba(0,0,0,.1),0 3px 5px 0 rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.09098)}.mx-740-none{display:none}.mx-740-ipt{border-radius:10px;margin-bottom:10px}.mx-740-tip{position:absolute;right:13px;top:4px;color:#999}");
var Monitor = require('../monitor/index');
var EnhanceMax = 100;
var EnhanceItemHeight = 25;
var XScroll = require('../generic/xscroll');
module.exports = Magix.View.extend({
    tmpl: "<div mx-click=\"toggle();\" class=\"mx-740-header\" id=\"header_<%=id%>\" style=\"width:<%=width%>px\" mx-guid=\"x1eb1-\u001f\">@1-\u001f</div><div id=\"list_<%=id%>\" class=\"mx-740-items mx-740-none\"><%if(search){%><input class=\"input mx-740-ipt\" mx-guid=\"x1eb2-\u001f\" mx-keyup=\"search()\" mx-paste=\"search()\" style=\"width:<%=width-10%>px\"/> <span class=\"mx-740-tip\" mx-guid=\"x1eb3-\u001f\">@2-\u001f</span><%}%><ul id=\"scroll_<%=id%>\" class=\"mx-740-list\" mx-guid=\"x1eb4-\u001f\" style=\"width:<%=width+9%>px;<%if(height){%>max-height:<%=height%>px;overflow:auto<%}%>\">@3-\u001f</ul></div>",
    tmplData: [{"guid":1,"keys":["titleText","width"],"tmpl":"<span class=\"ellipsis mx-740-ib\" style=\"width:<%=width-15%>px\" id=\"title_<%=id%>\" title=\"<%=titleText%>\"><%=titleText%></span><span class=\"mx-740-icon\" id=\"icon_<%=id%>\">⇩</span>","selector":"div[mx-guid=\"x1eb1-\u001f\"]","attrs":[{"n":"style","v":"width:<%=width%>px"}],"mask":"13"},{"guid":2,"keys":["tip"],"tmpl":"<%=tip%>","selector":"span[mx-guid=\"x1eb3-\u001f\"]"},{"guid":3,"keys":["list","selected","width","height"],"tmpl":"<%if(before){%><li style=\"height:<%=before%>px\"></li><%}for(var i=0,one;i<list.length;i++){one=list[i]%><li mx-mouseover=\"hover()\" mx-mouseout=\"hover();\" mx-click=\"select({id:'<%=one.id%>'})\" class=\"mx-740-li ellipsis<%if(selected==one.id){%> mx-740-selected<%}%>\" title=\"<%=one.text%>\"><%=one.text%></li><%}if(after){%><li style=\"height:<%=after%>px\"></li><%}%>","selector":"ul[mx-guid=\"x1eb4-\u001f\"]","attrs":[{"n":"style","v":"width:<%=width+9%>px;<%if(height){%>max-height:<%=height%>px;overflow:auto<%}%>"}],"mask":"1122"},{"keys":["width"],"selector":"input[mx-guid=\"x1eb2-\u001f\"]","attrs":[{"n":"style","v":"width:<%=width-10%>px"}]}],
    ctor: function(extra) {
        var me = this;
        Monitor.setup();
        me.on('destroy', Monitor.teardown);
        me.$extra = extra;
    },
    inside: function(node) {
        var me = this;
        var inside = Magix.inside(node, me.id);
        return inside;
    },
    update: function(ops) {
        var me = this;
        var map = Magix.toMap(ops.list, 'id');
        if (!ops.selected || !map[ops.selected]) {
            ops.selected = ops.list[0].id;
        }
        me.$list = ops.list;
        var list = me.$list;
        var data = me.$updater;
        var val = data.get('iptValue');
        data.set({
            tip: '',
            before: 0,
            after: 0,
            search: ops.search,
            width: (ops.width | 0) || 150,
            height: (ops.height | 0) || 0,
            map: map,
            id: me.id,
            titleText: map[ops.selected].text,
            selected: ops.selected
        });
        if (val) {
            me.search(val, function(list) {
                me.enhance(list);
            });
        } else {
            me.enhance(list);
        }
    },
    enhance: function(list) {
        var me = this;
        var xscroll = me.$xscroll;
        if (!xscroll) {
            xscroll = new XScroll();
            me.capture('xscroll', xscroll);
            xscroll.onupdate = function(e) {
                //console.log(e);
                me.$updater.set(e).digest();
            };
        }
        xscroll.link(EnhanceItemHeight, EnhanceMax, list, 'scroll_' + me.id);
    },
    render: function() {
        var me = this;
        me.update(me.$extra);
    },
    hide: function(items) {
        var me = this;
        if (me.$shown) {
            me.$shown = false;
            Monitor.remove(me);
            items = items || $('#list_' + me.id);
            items.addClass('mx-740-none');
            var header = $('#header_' + me.id);
            header.removeClass('mx-740-header-active'); //'';
            var icon = $('#icon_' + me.id);
            icon.html('⇩');
        }
    },
    show: function(items) {
        var me = this;
        if (!me.$shown) {
            me.$shown = true;
            Monitor.add(me);
            var doc = $(document);
            var docHeight = doc.height();
            items = items || $('#list_' + me.id);
            items.removeClass('mx-740-none');
            var header = $('#header_' + me.id);
            header.addClass('mx-740-header-active');
            var icon = $('#icon_' + me.id);
            icon.html('⇧');
            var itemsHeight = items.outerHeight();
            if (itemsHeight + items.offset().top > docHeight) {
                items.css({
                    marginTop: -(itemsHeight + header.outerHeight())
                });
            } else {
                items.css({
                    marginTop: 0
                });
            }
            $('#' + me.id).trigger('focusin');
        }
    },
    search: function(val, callback) {
        var me = this;
        clearTimeout(me.$goTimer);
        var srcList = me.$list;
        var newList = [];
        var index = 0;
        var max = srcList.length;
        if (!val) {
            callback(srcList);
            return;
        }
        var go = function() {
            if (index < max) {
                var end = Math.min(index + 400, max);
                for (var i = index, li; i < end; i++) {
                    li = srcList[i];
                    if ((li.text + '').indexOf(val) >= 0) {
                        newList.push(li);
                    }
                }
                index = end;
                me.$goTimer = setTimeout(me.wrapAsync(go), 20);
            } else {
                callback(newList);
            }
        };
        go();
    },
    'hover<mouseout,mouseover>': function(e) {
        var node = $(e.current);
        node[e.type == 'mouseout' ? 'removeClass' : 'addClass']('mx-740-over');
    },
    'toggle<click>': function() {
        var me = this;
        var items = $('#list_' + me.id);
        if (items.hasClass('mx-740-none')) {
            me.show(items);
        } else {
            me.hide(items);
        }
    },
    'select<click>': function(e) {
        var me = this;
        var id = e.params.id;
        var data = me.$updater;
        var selected = data.get('selected');
        if (selected != id) {
            var map = data.get('map');
            data.set({
                selected: id,
                titleText: map[id].text
            }).digest();
            $('#' + me.id).val(id).trigger({
                type: 'change',
                value: id,
                text: data.get('titleText')
            });
        }
        me.hide();
    },
    'search<keyup,paste>': function(e) {
        var me = this;
        clearTimeout(me.$stimer);
        me.$stimer = setTimeout(me.wrapAsync(function() { //ie8 paste后并不能立即获取到input value
            var val = e.current.value;
            var data = me.$updater;
            var lastVal = data.get('iptValue');
            if (val != lastVal) {
                data.set({
                    tip: '搜索中...'
                }).digest();
                me.search(val, function(list) {
                    data.set({
                        tip: '',
                        iptValue: val
                    });
                    me.enhance(list);
                });
            }
        }), 150);
    }
});
});