/*
    author: xinglie.lkf@ taobao.com
 */
var Magix = require('magix');
var XWinScroll = require('@coms/generic/xwinscroll');
module.exports = Magix.View.extend({
    tmpl: '@test.html',
    tmplData: '@test.html:data',
    render: function() {
        var me = this;
        var list1 = [];
        for (var i = 10000; i >= 0; i--) list1.push(i);
        me.$updater.set({
            view: me.$updater.get('view') ? '' : 'app/views/coms/popover',
            a: Magix.guid(),
            b: Magix.guid(),
            checked: !me.$updater.get('checked'),
            pMap: {
                a: 1,
                c: 1
            },
            height: 10 + me.$updater.get('height') || 0,
            permissions: ['a', 'b', 'c', 'd'],
            list: [{
                id: Magix.guid(),
                text: Magix.guid()
            }]
        });

        var xscroll = me.$xscroll;
        if (!xscroll) {
            xscroll = new XWinScroll();
            me.capture('xscroll', me.$xscroll = xscroll);
            xscroll.onupdate = function(e) {
                console.log(e);
                e.list1 = e.list;
                delete e.list;
                me.$updater.set(e).digest();
            };
        }
        xscroll.link(20, list1, 'test1');
        console.log(me.$updater);
    },
    'change<click>': function() {
        this.render();
    },
    'changeMap<click>': function() {
        var data = this.$updater;
        var r = function() {
            return Math.random() < 0.5;
        };
        var pMap = {
            a: r(),
            b: r(),
            c: r(),
            d: r()
        };
        data.set({
            pMap: pMap
        }).digest();
    }
});