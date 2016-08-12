define('app/views/demos/partials/table-settings-fields',['magix','$','../../../../coms/picker/index','../../../../coms/autoscroll/index','../../../../coms/dragdrop/index'],function(require,exports,module){
/*Magix ,$ ,Picker ,Autoscroll ,DD */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Picker = require('../../../../coms/picker/index');
var Autoscroll = require('../../../../coms/autoscroll/index');
var DD = require('../../../../coms/dragdrop/index');
Magix.applyStyle('mx-fec',".mx-fec-cnt{padding:10px}.mx-fec-fields-wrapper{width:500px}.mx-fec-buttons{margin-top:10px}.mx-fec-buttons button{margin-right:8px}.mx-fec-fields{width:60%;float:left}.mx-fec-fields label{margin:2px 8px 3px;display:inline-block}.mx-fec-sortable{width:40%;float:left;height:200px;overflow:auto}.mx-fec-ghost li,.mx-fec-sortable li{height:20px;line-height:20px;border:1px solid #ccc;margin-bottom:3px;padding:4px;cursor:move}li.mx-fec-dragged{opacity:.3}.mx-fec-ghost{position:absolute;left:-9999px}.mx-fec-ghost li{background:#fff;width:120px}.mx-fec-bar{width:120px;height:1px;border:5px solid #333;position:absolute;left:-9999px;cursor:move;border-top:5px solid transparent;border-bottom:5px solid transparent}.mx-fec-barh{height:1px;overflow:hidden;background:#000}.mx-fec-h-fields{margin-top:20px;width:500px;height:100px;overflow:auto}.mx-fec-h-fields li{width:80px;height:80px;padding:5px;display:inline-block;background:#eee;line-height:80px;margin:0 2px}.mx-fec-hbar{width:1px;border:5px solid #333;position:absolute;left:-9999px;cursor:move;border-left:5px solid transparent;border-right:5px solid transparent}.mx-fec-hbarh{width:1px;height:100%;overflow:hidden;background:#000}");
var CSSNames = {"cnt":"mx-fec-cnt","fields-wrapper":"mx-fec-fields-wrapper","buttons":"mx-fec-buttons","fields":"mx-fec-fields","sortable":"mx-fec-sortable","ghost":"mx-fec-ghost","dragged":"mx-fec-dragged","bar":"mx-fec-bar","barh":"mx-fec-barh","h-fields":"mx-fec-h-fields","hbar":"mx-fec-hbar","hbarh":"mx-fec-hbarh"};
module.exports = Picker.extend({
    tmpl: "<div class=\"mx-fec-cnt\"><div class=\"mx-fec-fields-wrapper clearfix\"><div class=\"mx-fec-fields\" mx-guid=\"x7f01-\u001f\">@1-\u001f</div><div class=\"mx-fec-sortable\" id=\"sortable_<%=id%>\"><ul mx-guid=\"x7f02-\u001f\">@2-\u001f</ul></div></div><div class=\"mx-fec-h-fields\" mx-guid=\"x7f03-\u001f\" id=\"hsortable_<%=id%>\">@3-\u001f</div><div class=\"mx-fec-buttons\"><button class=\"btn\" mx-click=\"enter();\">确定</button> <button class=\"btn\" mx-click=\"cancel();\">取消</button></div></div>",
    tmplData: [{"guid":1,"keys":["fields","checkedMap"],"tmpl":"<%for(var i=0;i<fields.length;i++){%><label><input type=\"checkbox\" <%if(checkedMap[fields[i].id]){%> checked=\"checked\" <%}%> mx-click=\"toggleField({id:'<%=fields[i].id%>'})\"/><%=fields[i].text%></label><%}%>","selector":"div[mx-guid=\"x7f01-\u001f\"]"},{"guid":2,"keys":["checkedFields"],"tmpl":"<%for(var i=0;i<checkedFields.length;i++){%><li dragdrop=\"v\" id=\"sf_<%=checkedFields[i]%>_<%=id%>\" mx-mousedown=\"dragStart()\" index=\"<%=i%>\"><span><%=fieldsMap[checkedFields[i]].text%></span><i style=\"display: inline-block;float:right\">xx</i></li><%}%>","selector":"ul[mx-guid=\"x7f02-\u001f\"]"},{"guid":3,"keys":["checkedFields"],"tmpl":"<ul style=\"width:<%=94*checkedFields.length%>px\"><%for(var i=0;i<checkedFields.length;i++){%><li dragdrop=\"h\" id=\"sf_<%=checkedFields[i]%>_<%=id%>\" mx-mousedown=\"dragStartH()\" index=\"<%=i%>\"><span><%=fieldsMap[checkedFields[i]].text%></span><i style=\"display: inline-block;float:right\">xx</i></li><%}%></ul>","selector":"div[mx-guid=\"x7f03-\u001f\"]"}],
    ctor: function() {
        var me = this;
        me.on('destroy', function() {
            $('#ghost_' + me.id).remove();
            $('#bar_' + me.id).remove();
            $('#hghost_' + me.id).remove();
            $('#hbar_' + me.id).remove();
        });
    },
    render: function() {
        this.endUpdate();
    },
    update: function(ops) {
        var me = this;
        if (!me.$shown) {
            var data = me.$updater;
            data.set({
                id: me.id,
                fields: ops.fields,
                fieldsMap: Magix.toMap(ops.fields, 'id'),
                checkedFields: ops.checkedFields.slice(0),
                checkedMap: Magix.toMap(ops.checkedFields)
            }).digest();
            me.$picked = ops.picked;
            me.show();
        }
    },
    'toggleField<click>': function(e) {
        var params = e.params;
        var data = this.$updater;
        var checkedFields = data.get('checkedFields');
        var checkedMap = data.get('checkedMap');
        if (e.current.checked) {
            checkedFields.push(params.id);
            checkedMap[params.id] = 1;
        } else {
            for (var i = checkedFields.length - 1; i >= 0; i--) {
                if (checkedFields[i] == params.id) {
                    checkedFields.splice(i, 1);
                }
            }
            delete checkedMap[params.id];
        }
        data.set({
            checkedMap: checkedMap,
            checkedFields: checkedFields
        }).digest();
    },
    'dragStart<mousedown>': function(e) {
        var me = this;
        var autoscroll = new Autoscroll($('#sortable_' + me.id));
        autoscroll.start();
        var dGhostId = 'ghost_' + me.id;
        var bId = 'bar_' + me.id;
        var showDragGhost = function(event) {
            var ghost = $('#' + dGhostId);
            if (!ghost.length) {
                $('body').append('<ul id="' + dGhostId + '" class="' + CSSNames.ghost + '" /><div id="' + bId + '" class="' + CSSNames.bar + '"><div class="' + CSSNames.barh + '" /></div>');
                ghost = $('#' + dGhostId);
            }
            ghost.html('<li>' + event.current.innerHTML + '</li>');
        };
        showDragGhost(e);
        var ghost = $('#' + dGhostId);
        var bar = $('#' + bId);
        var current = $(e.current);
        var width = current.outerWidth();
        var height = current.outerHeight();
        current.addClass(CSSNames.dragged);
        ghost.width(width);
        bar.width(width - 4);

        var lastNode, offset, dir, lastDir, scrolling;
        autoscroll.onscroll = function() { //滚动时隐藏相应的元素
            DD.clear();
            bar.css({
                left: -9999
            });
            lastNode = '';
            lastDir = '';
            scrolling = true;
        };
        autoscroll.onstop = function() {
            scrolling = false;
        };
        DD.begin(e.current, function(event) {
            DD.clear();
            autoscroll.check(event);
            ghost.css({
                top: event.pageY + 15,
                left: event.pageX + 20
            });
            if (scrolling) return;
            var node = DD.fromPoint(event.clientX, event.clientY);
            if (node && node.getAttribute) {
                if (node != lastNode && node.getAttribute('dragdrop') == 'v') {
                    lastNode = node;
                    offset = $(node).offset();
                    lastDir = '';
                }
            }
            if (lastNode) {
                if (event.pageY > offset.top + height / 2) {
                    dir = 'bottom';
                } else {
                    dir = 'top';
                }
                if (dir != lastDir) {
                    lastDir = dir;
                    bar.css({
                        left: offset.left - 3,
                        top: offset.top - 5 + (dir == 'bottom' ? height + 1 : -2)
                    });
                }
            }
        }, function() {
            autoscroll.finish();
            ghost.css({
                left: -99999
            });
            bar.css({
                left: -9999
            });
            current.removeClass(CSSNames.dragged);
            if (!lastDir) return;
            var startIdx = parseInt(current.attr('index'), 10);
            var aimIndex = parseInt(lastNode.getAttribute('index'), 10);
            if (startIdx == aimIndex) return;
            var checkedFields = me.$updater.get('checkedFields');
            var startItem = checkedFields[startIdx];
            checkedFields.splice(startIdx, 1);
            if (startIdx < aimIndex) {
                checkedFields.splice(aimIndex + (lastDir == 'top' ? -1 : 0), 0, startItem);
            } else {
                checkedFields.splice(aimIndex + (lastDir == 'top' ? 0 : 1), 0, startItem);
            }
            me.$updater.set({
                checkedFields: checkedFields
            }).digest();
        });
    },
    'dragStartH<mousedown>': function(e) {
        var me = this;
        var autoscroll = new Autoscroll($('#hsortable_' + me.id));
        autoscroll.start();
        var dGhostId = 'hghost_' + me.id;
        var bId = 'hbar_' + me.id;
        var showDragGhost = function(event) {
            var ghost = $('#' + dGhostId);
            if (!ghost.length) {
                $('body').append('<ul id="' + dGhostId + '" class="' + CSSNames.ghost + '" /><div id="' + bId + '" class="' + CSSNames.hbar + '"><div class="' + CSSNames.hbarh + '" /></div>');
                ghost = $('#' + dGhostId);
            }
            ghost.html('<li>' + event.current.innerHTML + '</li>');
        };
        showDragGhost(e);
        var ghost = $('#' + dGhostId);
        var bar = $('#' + bId);
        var current = $(e.current);
        var width = current.outerWidth();
        var height = current.outerHeight();
        current.addClass(CSSNames.dragged);
        ghost.height(height);
        bar.height(height - 4);

        var lastNode, offset, dir, lastDir, scrolling;
        autoscroll.onscroll = function() { //滚动时隐藏相应的元素
            bar.css({
                left: -9999
            });
            lastNode = '';
            lastDir = '';
            scrolling = true;
            DD.clear();
        };
        autoscroll.onstop = function() {
            scrolling = false;
        };
        DD.begin(e.current, function(event) {
            DD.clear();
            autoscroll.check(event);
            ghost.css({
                top: event.pageY + 15,
                left: event.pageX + 20
            });
            if (scrolling) return;
            var node = DD.fromPoint(event.clientX, event.clientY);
            if (node && node.getAttribute) {
                if (node != lastNode && node.getAttribute('dragdrop') == 'h') {
                    lastNode = node;
                    offset = $(node).offset();
                    lastDir = '';
                }
            }
            if (lastNode) {
                if (event.pageX > offset.left + width / 2) {
                    dir = 'right';
                } else {
                    dir = 'left';
                }
                if (dir != lastDir) {
                    lastDir = dir;
                    bar.css({
                        top: offset.top - 3,
                        left: offset.left - 5 + (dir == 'right' ? width + 1 : -2)
                    });
                }
            }
        }, function() {
            autoscroll.finish();
            ghost.css({
                left: -99999
            });
            bar.css({
                left: -9999
            });
            current.removeClass(CSSNames.dragged);
            if (!lastDir) return;
            var startIdx = parseInt(current.attr('index'), 10);
            var aimIndex = parseInt(lastNode.getAttribute('index'), 10);
            if (startIdx == aimIndex) return;
            var checkedFields = me.$updater.get('checkedFields');
            var startItem = checkedFields[startIdx];
            checkedFields.splice(startIdx, 1);
            if (startIdx < aimIndex) {
                checkedFields.splice(aimIndex + (lastDir == 'left' ? -1 : 0), 0, startItem);
            } else {
                checkedFields.splice(aimIndex + (lastDir == 'left' ? 0 : 1), 0, startItem);
            }
            me.$updater.set({
                checkedFields: checkedFields
            }).digest();
        });
    },
    'cancel<click>': function() {
        this.hide();
    },
    'enter<click>': function() {
        var me = this;
        var checkedFields = me.$updater.get('checkedFields');
        if (me.$picked) {
            Magix.toTry(me.$picked, [checkedFields]);
        }
        me.hide();
    }
}, {
    show: function(view, ops) {
        var id = ops.ownerNodeId;
        id = 'tsf_' + id;
        var vf = Magix.Vframe.get(id);
        if (!vf) {
            $('body').append('<div id="' + id + '" />');
            vf = view.owner.mountVframe(id, 'app/views/demos/partials/table-settings-fields', ops);
        }
        vf.invoke('update', [ops]);
    }
});
});