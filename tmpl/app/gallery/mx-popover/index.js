/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.css');
let Active;
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me.$placement = extra.placement || 'right';
        me.$align = extra.align;
        me.$content = extra.content || '';
        me.$width = extra.width | 0;
        me.on('destroy', function() {
            me.$ownerNode.off('mouseenter mouseleave');
            if (me.$rNode) {
                me.$rNode.off('mouseenter mouseleave').remove();
            }
        });
    },
    render() {
        let me = this;
        me.endUpdate();
        let node = $('#' + me.id);
        me.$ownerNode = node;
        node.hover(() => {
            me.prepare();
            me.$timer = setTimeout(me.wrapAsync(() => {
                me.show(); //等待内容显示
            }), 100);
        }, () => {
            clearTimeout(me.$timer);
            me.hide();
        });
    },
    prepare() {
        let me = this;
        if (!me.$rNode) {
            let id = 'popover_' + me.id;
            me.$ownerNode.after('<div class="@index.css:popover" id="' + id + '" />');
            me.updater.to(id).digest({
                content: me.$content
            });
            me.$rNode = $('#' + id);
            if (me.$width) {
                me.$rNode.css({
                    'max-width': me.$width,
                    width: me.$width
                });
            }
            me.$rNode.hover(() => {
                clearTimeout(me.$timer);
            }, () => {
                me.hide();
            });
        }
    },
    content(body) {
        let me = this;
        if (!body) {
            return me.$content;
        }
        if (!me.$rNode) {
            me.$content = body;
        } else {
            me.$content = body;
            me.updater.digest({
                content: body
            });
        }
    },
    show() {
        let me = this;
        if (Active && Active != me) { //优化大量提示的显示
            Active.immediatelyHide();
        }
        Active = me;
        clearTimeout(me.$timer);
        let rNode = me.$rNode;
        let oNode = me.$ownerNode;
        let offset = oNode.offset();
        let width = oNode.outerWidth();
        let height = oNode.outerHeight();
        rNode.css({
            display: 'block'
        });
        let rWidth = rNode.outerWidth();
        let rHeight = rNode.outerHeight();
        let left, top;
        switch (me.$placement) {
            case 'top':
                left = offset.left - (rWidth - width) / 2;
                top = offset.top - rHeight - 10;
                break;
            case 'right':
                left = offset.left + width + 10;
                top = offset.top - (rHeight - height) / 2;
                break;
            case 'bottom':
                left = offset.left - (rWidth - width) / 2;
                top = offset.top + height + 10;
                break;
            case 'left':
                left = offset.left - rWidth - 10;
                top = offset.top - (rHeight - height) / 2;
                break;
        }
        switch (me.$align) {
            case 'top':
                top = offset.top;
                break;
            case 'left':
                left = offset.left;
                break;
            case 'right':
                left = offset.left - rWidth + width;
                break;
            case 'bottom':
                top = offset.top - rHeight + height;
                break;
        }
        rNode.offset({
            left: left,
            top: top
        });
    },
    hide() {
        let me = this;
        clearTimeout(me.$timer);
        me.$timer = setTimeout(me.wrapAsync(() => {
            me.$rNode.css({
                display: 'none'
            });
        }), 50);
    },
    immediatelyHide() {
        let me = this;
        clearTimeout(me.$timer);
        me.$rNode.css({
            display: 'none'
        });
    }
});