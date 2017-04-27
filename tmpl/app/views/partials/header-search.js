'#snippet';
/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@header-search.less');
let Menu = require('@app/menu');
let $ = require('$');
let RegCache = new Magix.Cache();
let escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
let KeyReg = (key) => {
    let info = RegCache.get(key);
    if (!info) {
        let src = ['(.*?)('];
        let ks = key.split('');
        if (ks.length) {
            while (ks.length) {
                src.push(ks.shift().replace(escapeRegExp, '\\$&'), ')(.*?)(');
            }
            src.pop();
        }
        src.push(')(.*?)');
        src = src.join('');
        let reg = new RegExp(src, 'i');
        let replacer = [];
        let start = key.length;
        let begin = 1;
        while (start > 0) {
            start--;
            replacer.push('$', begin, '($', begin + 1, ')');
            begin += 2;
        }
        replacer.push('$', begin);

        RegCache.set(key, info = {
            regexp: reg,
            replacement: replacer.join('')
        });
    }
    return info;
};
let SearchMenu = (key) => {
    let menuInfo = Menu.menu();
    let menus = menuInfo.menus;
    let list = [];
    let regInfo = KeyReg(key);
    let searchSub = (menu) => {
        let subs = menu.subs;
        if (subs && subs.length) {
            for (let j = 0; j < subs.length; j++) {
                let sub = subs[j];
                if (regInfo.regexp.test(sub.text) || regInfo.regexp.test(sub.url)) {
                    if (sub.subs) {
                        list.push.apply(list, sub.subs);
                    } else {
                        list.push(sub);
                    }
                } else {
                    searchSub(sub);
                }
            }
        }
    };
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        searchSub(menu);
    }
    return list;
};
let Search = (key, view) => {
    let defer = $.Deferred();
    if (!key) {
        defer.resolve([]);
    } else {
        let list = SearchMenu(key);
        defer.resolve(list);
    }
    return defer.promise();
};
module.exports = Magix.View.extend({
    tmpl: '@header-search.html',
    init() {
        this.$idx = -1;
    },
    render() {
        this.updater.digest({
            viewId: this.id
        });
    },
    'clear<click>' () {
        var me = this;
        var node = $('#gsearch_' + me.id + ' input');
        node.val('');
        node.trigger('input');
    },
    'search<keyup,paste,input,focusin>' (e) {
        var me = this;
        var list = me.updater.get('searchList');
        if (e.type == 'focusin' && list && list.length) {
            $('#gsearch_result_' + me.id).removeClass('@scoped.style:none');
            return;
        }
        var val = $.trim(e.eventTarget.value);
        var action = val ? 'removeClass' : 'addClass';
        $('#gsearch_' + me.id + ' .@header-search.less:clear-icon')[action]('@scoped.style:none');
        if (e.type == 'keyup' && list && list.length) {
            $('#gsearch_result_' + me.id).removeClass('none');
            if (e.keyCode == 40) {
                me.normal();
                me.$idx++;
                if (me.$idx >= list.length) {
                    me.$idx = 0;
                }
                me.highlight();
            } else if (e.keyCode == 38) {
                me.normal();
                me.$idx--;
                if (me.$idx < 0) {
                    me.$idx = list.length - 1;
                }
                me.highlight();
            } else if (e.keyCode == 13) {
                var node = $('#sg_' + me.id + '_' + me.$idx);
                if (node && node.length) {
                    var href = node.find('a').attr('href').slice(2);
                    Magix.Router.to(href);
                    me.hideSearchList();
                    $('#sipt_' + me.id).blur();
                }
            }
        }
        clearTimeout(me.$sTimer);
        me.$sTimer = setTimeout(me.wrapAsync(() => {
            var val = $.trim(e.eventTarget.value);
            if (val != me.$sValue) {
                me.$idx = -1;
                me.$sValue = val;
                Search(val, me).then((list) => {
                    me.updater.digest({
                        searchKeyRegInfo: KeyReg(val),
                        searchList: list
                    });
                });
            }
        }), 300);
    },
    normal() {
        var me = this;
        var node = $('#sg_' + me.id + '_' + me.$idx);
        node.removeClass('@header-search.less:search-item-on');
    },
    highlight(ignore) {
        var me = this;
        var node = $('#sg_' + me.id + '_' + me.$idx);
        node.addClass('@header-search.less:search-item-on');
        if (!ignore && node.length) {
            me.$ignore = 1; //如果是上下按键引起的滚动，则在move时忽略
            var height = 32.6; //node.outerHeight();
            var scrolled = (me.$idx + 1) * height;
            var rNode = $('#gsearch_result_' + me.id + ' ul');
            var vHeight = rNode.height();
            var sTop = rNode.prop('scrollTop');
            var items = Math.ceil(vHeight / height);
            if (scrolled < sTop + height) {
                rNode.prop('scrollTop', scrolled - height);
            } else if (scrolled > sTop + vHeight) {
                rNode.prop('scrollTop', (me.$idx + 2 - items) * height);
            }
        }
    },
    hideSearchList() {
        var me = this;
        $('#gsearch_result_' + me.id).addClass('@scoped.style:none');
        me.normal();
        me.$idx = -1;
    },
    'hide<click>' () {
        this.hideSearchList();
    },
    'out<mouseout>': function(e) {
        var flag = !Magix.inside(e.relatedTarget, e.eventTarget);
        if (flag) {
            var me = this;
            me.normal();
            me.$idx = -1;
        }
    },
    'move<mousemove>': function(e) {
        var me = this;
        if (me.$ignore) {
            delete me.$ignore;
            return;
        }
        var target = $(e.target);
        if (target.is('a')) target = target.parent();
        if (target.is('li')) {
            var idx = target.data('idx');
            if (idx != me.$idx) {
                me.normal();
                me.$idx = idx;
                me.highlight(true);
            }
        }
    },
    '$doc<click>' (e) {
        var me = this;
        var inside = Magix.inside(e.target, 'gsearch_' + me.id);
        if (!inside) {
            me.hideSearchList();
        }
    }
});