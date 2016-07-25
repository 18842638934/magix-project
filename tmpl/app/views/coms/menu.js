/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Contextmenu = require('@coms/menu/context');
module.exports = Magix.View.extend({
    tmpl: '@menu.html',
    tmplData: '@menu.html:data',
    render: function(name) {
        var me = this;
        me.request('render').all(name || 'list', function(err, bag) {
            if (err) {
                me.setHTML(me.id, err.msg);
            } else {
                me.$list = bag.get('data', []);
                me.$updater.set({
                    id: me.id,
                    list: bag.get('data', []),
                    width1: name ? 360 : 300,
                    width2: name ? 300 : 130
                }).digest();
            }
        });
    },
    'showContextMenu<contextmenu>': function(e) {
        e.preventDefault();
        Contextmenu.show(this, {
            ownerNode: e.current,
            width: 400,
            list: this.$list,
            pageX: e.pageX,
            pageY: e.pageY,
            picked: function(e) {
                console.log('contextmenu', e);
            }
        });
    },
    'changeService<click>': function() {
        this.render('list1');
    },
    'menu2<pick>': function(e) {
        console.log(e);
    }
});