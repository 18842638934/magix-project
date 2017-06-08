'#snippet';
/*
    author: xinglie.lkf@ alibaba - inc.com
 */
let Magix = require('magix');
let $ = require('$');
let Monitor = require('../mx-monitor/index');
Magix.applyStyle('@suggest.less');
module.exports = Magix.View.extend({
    tmpl: '@suggest.html',
    init(extra) {
        let me = this;
        me.$scrollTop = extra.scrollTop || 0;
        me.$list = extra.list || [];
        me.$offsetLeft = (extra.offsetLeft || 0) | 0;
        Monitor.setup();
        me.on('destroy', function() {
            Monitor.teardown();
            me.$oNode.off('keyup paste input', me.$watch)
                .off('focus', me.$show);
        });
        me.updater.set({
            viewId: me.id,
            width: extra.width || 340,
            textKey: extra.textKey,
            valueKey: extra.valueKey
        });
        me.$map = extra.map || Magix.toMap(me.$list, extra.valueKey);
        me.$idx = -1;
        me.$relateIds = [me.id, 'suggest_' + me.id];
        if (extra.relateIds) {
            me.$relateIds = me.$relateIds.concat(extra.relateIds.split(','));
        }
    },
    inside(node) {
        let me = this;
        let ids = me.$relateIds;
        for (let i = 0; i < ids.length; i++) {
            if (Magix.inside(node, ids[i])) {
                return true;
            }
        }
        return false;
    },
    update(list, ignore) {
        let me = this;
        if (!ignore) {
            me.$list = list;
            me.$map = Magix.toMap(list, me.updater.get('valueKey'));
        }
        me.$idx = -1;
        me.updater.digest({
            list: me.$slist = list
        });
    },
    render() {
        let me = this;
        let oNode = $('#' + me.id);
        me.$oNode = oNode;
        oNode.on('focus', me.$show = $.proxy(me.show, me))
            .on('keyup paste input', me.$watch = $.proxy(me.filter, me));
        let id = 'suggest_' + me.id;
        $('<div />').attr('id', id).insertAfter(oNode);
        me.updater.to(id);
        me.update(me.$list);
        me.$rNode = $('#' + id + ' ul');
        setTimeout(me.wrapAsync(() => {
            me.$rNode.prop('scrollTop', me.$scrollTop);
        }), 0);
    },
    filter(e) {
        let me = this;
        if (!me.$shown) me.show();
        let slist = me.$slist;
        if (e.keyCode == 40) {
            me.normal();
            me.$idx++;
            if (me.$idx >= slist.length) {
                me.$idx = 0;
            }
            me.highlight();
        } else if (e.keyCode == 38) {
            me.normal();
            me.$idx--;
            if (me.$idx < 0) {
                me.$idx = slist.length - 1;
            }
            me.highlight();
        } else if (e.keyCode == 13) {
            if (me.$idx > -1 && me.$idx < me.$slist.length) {
                let item = me.$slist[me.$idx];
                me.$oNode.trigger({
                    type: 'pick',
                    item: item
                });
                me.normal();
                me.$idx = -1;
                me.hide();
            }
        } else {
            let val = $.trim(e.target.value);
            if (val != me.$val) {
                me.$val = val;
                if (val) {
                    let arr = [];
                    let list = me.$list.slice();
                    let key = me.updater.get('textKey');
                    let text;
                    for (let i = 0, one; i < list.length; i++) {
                        one = list[i];
                        text = key ? one[key] : one;
                        if ((text + '').indexOf(val) >= 0) {
                            arr.push(one);
                        }
                    }
                    me.update(arr, true);
                } else {
                    me.update(me.$list, true);
                }
            }
        }
    },
    show() {
        let me = this;
        let updater = me.updater;
        if (!me.$shown) {
            me.$shown = true;
            let rList = updater.get('rList');
            if (!rList) {
                updater.digest({
                    rList: true
                });
            }
            Monitor.add(me);
            let offset = me.$oNode.position();
            me.$rNode.show().css({
                left: offset.left + me.$offsetLeft,
                top: offset.top + me.$oNode.outerHeight() + 10
            });
            me.$oNode.trigger('showlist');
        }
    },
    normal() {
        let me = this;
        let node = $('#sg_' + me.id + '_' + me.$idx);
        node.removeClass('@suggest.less:active');
    },
    highlight(ignore) {
        let me = this;
        let node = $('#sg_' + me.id + '_' + me.$idx);
        node.addClass('@suggest.less:active');
        if (!ignore && node.length) {
            me.$ignore = 1; //如果是上下按键引起的滚动，则在move时忽略
            let height = node.outerHeight();
            let scrolled = (me.$idx + 1) * height;
            let rNode = me.$rNode;
            let vHeight = rNode.height();
            let sTop = rNode.prop('scrollTop');
            let items = Math.ceil(vHeight / height);

            if (scrolled < sTop + height) {
                rNode.prop('scrollTop', scrolled - height);
            } else if (scrolled > sTop + vHeight) {
                rNode.prop('scrollTop', (me.$idx + 2 - items) * height);
            }
        }
    },
    hide() {
        let me = this;
        if (me.$shown) {
            me.$shown = false;
            Monitor.remove(me);
            me.$rNode.hide();
            me.$oNode.trigger('hidelist');
        }
    },
    'pick<click>' (e) {
        let me = this;
        let updater = me.updater;
        let map = me.$map;
        let valueKey = updater.get('valueKey');
        let key = e.params.key;
        let item = valueKey ? map[key] : key;
        me.$oNode.trigger({
            type: 'pick',
            item: item,
            scrollTop: me.$rNode.prop('scrollTop')
        });
        me.hide();
    },
    'out<mouseout>' (e) {
        let flag = !Magix.inside(e.relatedTarget, e.eventTarget);
        if (flag) {
            let me = this;
            me.normal();
            me.$idx = -1;
        }
    },
    'move<mousemove>' (e) {
        let me = this;
        if (me.$ignore) {
            delete me.$ignore;
            return;
        }
        let target = $(e.target);
        if (target.is('li')) {
            let idx = target.data('idx');
            if (idx != me.$idx) {
                me.normal();
                me.$idx = idx;
                me.highlight(true);
            }
        }
    }
});
