define('coms/dragdrop/izone',['magix','$','./zone'],function(require,exports,module){
/*Magix ,$ ,DragdropZone */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('mx-830',".mx-830-enable{background-color:green}.mx-830-disable{background-color:red}.mx-830-pointer{height:14px;line-height:14px;padding:1px 2px;border:2px solid #ccc;color:#fff;z-index:99999}.mx-830-bar,.mx-830-pointer{position:absolute;overflow:hidden;display:none}.mx-830-bar{border-width:3px;z-index:99998}.mx-830-bar div{overflow:hidden;background-color:#000}.mx-830-hbar{border-color:transparent #000;border-style:dashed solid}.mx-830-hbar div{height:2px}.mx-830-vbar{border-color:#000 transparent;border-style:solid dashed}.mx-830-vbar div{width:2px;height:100%}");
var ENABLE = 1,
    DISABLE = 2;
var DragdropZone = require('./zone');
var barId = Magix.guid('db');
var Bar = {
    create: function() {
        var node = $('#' + barId);
        if (!node.length) {
            $(document.body).append('<div id="' + barId + '" class="mx-830-bar"><div/></div>');
        }
    },
    hide: function() {
        $('#' + barId).hide();
    },
    update: function(anchor, bound, side) {
        var bar = $('#' + barId);
        if (anchor & IDragdropZone.ANCHOR_HORIZONTAL) {
            bar.removeClass('mx-830-vbar').addClass('mx-830-hbar');
            bar.css({
                width: bound.width - 6,
                height: 2,
                display: 'block'
            });
            if (DragdropZone.TOP & side) {
                bar.css({
                    left: bound.x,
                    top: bound.y - 4
                });
            } else {
                bar.css({
                    left: bound.x,
                    top: bound.y + bound.height - 2
                });
            }
        }
        if (anchor & IDragdropZone.ANCHOR_VERTICAL) {
            bar.removeClass('mx-830-hbar').addClass('mx-830-vbar');
            bar.css({
                height: bound.height - 6,
                width: 2,
                display: 'block'
            });
            if (DragdropZone.LEFT & side) {
                bar.css({
                    left: bound.x - 2,
                    top: bound.y
                });
            } else {
                bar.css({
                    left: bound.x + bound.width - 2,
                    top: bound.y
                });
            }
        }
    },
    move: function(position, bound) {
        var me = this;
        if (position & DragdropZone.LEFT) {
            me.update(IDragdropZone.ANCHOR_VERTICAL, bound, DragdropZone.LEFT);
        }
        if (position & DragdropZone.RIGHT) {
            me.update(IDragdropZone.ANCHOR_VERTICAL, bound, DragdropZone.RIGHT);
        }
        if (position & DragdropZone.TOP) {
            me.update(IDragdropZone.ANCHOR_HORIZONTAL, bound, DragdropZone.TOP);
        }
        if (position & DragdropZone.BOTTOM) {
            me.update(IDragdropZone.ANCHOR_HORIZONTAL, bound, DragdropZone.BOTTOM);
        }
    }
};
var pointerId = Magix.guid('dp');
var Pointer = {
    create: function() {
        var node = $('#' + pointerId);
        if (!node.length) {
            $(document.body).append('<div id="' + pointerId + '" class="mx-830-pointer"/>');
        }
    },
    hide: function() {
        $('#' + pointerId).hide();
    },
    move: function(e) {
        var node = $('#' + pointerId);
        node.css({
            display: 'block',
            left: e.pageX + 10,
            top: e.pageY + 8
        });
    },
    update: function(f, cfg) {
        var green = 'mx-830-enable',
            red = 'mx-830-disable';
        var me = this;
        if (me.$f != f) {
            me.$f = f;
            var add = f == ENABLE ? green : red;
            var remove = f == DISABLE ? green : red;
            var node = $('#' + pointerId);
            node.removeClass(remove).addClass(add);
            node.html(cfg[f == ENABLE ? 'textAllow' : 'textDisallow']);
        }
    }
};
var HANDV = 3;
var IDragdropZone = DragdropZone.extend({
    ctor: function(cfg) {
        var me = this;
        me.$config = Magix.mix({
            anchorPosition: HANDV,
            textAllow: IDragdropZone.TEXT_ALLOW,
            textDisallow: IDragdropZone.TEXT_DISALLOW
        }, cfg);
        me.on('dragstart', $.proxy(me.iDragStart, me));
        me.on('dragend', $.proxy(me.iDragEnd, me));
        me.on('hoverchildplacechanged', $.proxy(me.iHoverChildPlaceChanged, me));
        me.on('zonescroll', function() {
            Bar.hide();
            Pointer.update(DISABLE, this.$config);
        });
        me.on('dragmove', function(e) {
            Pointer.move(e);
        });
        me.on('hoverzonechanged', function(e) {
            if (e.zone) {
                me.$dragInfo.dropZone = e.zone;
                me.$dragInfo.emptyZone = 0;
                var zone = $(e.zone);
                var children = zone.children();
                if (!children.length) {
                    me.$dragInfo.emptyZone = 1;
                    Pointer.update(ENABLE, me.$config);
                    Bar.move(DragdropZone.TOP, e.zoneBound);
                }
            }
        });
    },
    iDragStart: function(e) {
        var me = this;
        me.$dragInfo = {
            child: e.child
        };
        $(e.child).css('opacity', 0.4);
        Bar.create();
        Pointer.create();
    },
    iDragEnd: function(e) {
        var me = this;
        var dragInfo = me.$dragInfo;
        $(dragInfo.child).css('opacity', 1);
        Bar.hide();
        Pointer.hide();
        if (dragInfo.emptyZone) {
            dragInfo.dropZone.appendChild(dragInfo.child);
            return;
        }
        if (dragInfo.hover) {
            var side = e.side;
            var cfg = me.$config;
            var dropZone = dragInfo.hover.parentNode;
            if (cfg.anchorPosition & IDragdropZone.ANCHOR_HORIZONTAL) {
                side = e.position & DragdropZone.TOP || e.position & DragdropZone.BOTTOM;
            } else if (cfg.anchorPosition & IDragdropZone.ANCHOR_VERTICAL) {
                side = e.position & DragdropZone.RIGHT || e.position & DragdropZone.LEFT;
            }
            if (side & DragdropZone.LEFT || side & DragdropZone.TOP) {
                dropZone.insertBefore(dragInfo.child, dragInfo.hover);
            } else if (side & DragdropZone.RIGHT || side & DragdropZone.BOTTOM) {
                var next = dragInfo.hover.nextSibling;
                while (next && next.nodeType != 1) {
                    next = next.nextSibling;
                }
                dropZone.insertBefore(dragInfo.child, next);
                if (!next) { //如果是最后一个，则滚动
                    dropZone.scrollTop = dragInfo.dropZone.scrollHeight;
                }
            }
        }
    },
    iHoverChildPlaceChanged: function(e) {
        var me = this;
        var dragInfo = me.$dragInfo;
        var cfg = me.$config;
        //if (dragInfo.child.parentNode == e.child.parentNode) return;
        if (dragInfo.child != e.child) {
            dragInfo.hover = e.child;
            if (cfg.anchorPosition == HANDV) {
                Bar.move(e.side, e.childBound);
            } else if (cfg.anchorPosition & IDragdropZone.ANCHOR_HORIZONTAL) {
                Bar.move((e.position & DragdropZone.TOP) || (e.position & DragdropZone.BOTTOM), e.childBound);
            } else {
                Bar.move((e.position & DragdropZone.LEFT) || (e.position & DragdropZone.RIGHT), e.childBound);
            }
            Pointer.update(ENABLE, cfg);
        } else {
            delete dragInfo.hover;
            Bar.hide();
            Pointer.update(DISABLE, cfg);
        }
    }
}, {
    ANCHOR_HORIZONTAL: 1,
    ANCHOR_VERTICAL: 2,
    TEXT_ALLOW: '可放置',
    TEXT_DISALLOW: '不可放置'
});
module.exports = IDragdropZone;
});