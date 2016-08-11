/*
    author: xinglie.lkf@ taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@test.html',
    render: function() {
        var me = this;
        me.$updater.set({
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
        }).digest();
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