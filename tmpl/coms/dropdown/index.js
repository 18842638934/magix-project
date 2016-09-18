/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('@index.css');
var Monitor = require('../monitor/index');
var EnhanceMax = 100;
var EnhanceItemHeight = 25;
var XScroll = require('../generic/xscroll');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    tmplData: '@index.html:data',
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
            items.addClass('@index.css:none');
            var header = $('#header_' + me.id);
            header.removeClass('@index.css:header-active'); //'';
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
            items.removeClass('@index.css:none');
            var header = $('#header_' + me.id);
            header.addClass('@index.css:header-active');
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
        node[e.type == 'mouseout' ? 'removeClass' : 'addClass']('@index.css:over');
    },
    'toggle<click>': function() {
        var me = this;
        var items = $('#list_' + me.id);
        if (items.hasClass('@index.css:none')) {
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