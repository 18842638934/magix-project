/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Router = Magix.Router;
var $ = require('$');
Magix.applyStyle('@index.css');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    ctor: function(extra) {
        var me = this;
        me.$updater.onchanged = function(e) {
            if (e.keys.index) {
                $('#' + me.id).trigger({
                    type: 'change',
                    index: this.get('index')
                });
            }
        };
        me.$extra = extra;
    },
    render: function() {
        var me = this;
        me.update(me.$extra);
    },
    cal: function() {
        var me = this;
        var data = me.$updater;
        var index = data.get('index') | 0;
        var pages = data.get('pages') | 0;
        if (index > pages) index = pages;
        var step = data.get('step') | 0;
        var middle = step / 2 | 0;
        var start = Math.max(1, index - middle);
        var end = Math.min(pages, start + step - 1);
        start = Math.max(1, end - step + 1);
        var offset;
        if (start <= 2) { //=2 +1  =1  +2
            offset = 3 - start;
            if (end + offset < pages) {
                end += offset;
            }
        }
        if (end + 2 > pages) {
            offset = 2 - (pages - end);
            if ((start - offset) > 1) {
                start -= offset;
            }
        }
        if (start == 3) {
            start -= 1;
        }
        if (end + 2 == pages) {
            end += 1;
        }
        data.set({
            index: index,
            start: start,
            end: end
        }).digest();
    },
    update: function(ops) {
        var me = this;
        var pages = Math.ceil((ops.total || 1) / (ops.size || 20));
        var index = ops.index || 1;
        me.$updater.set({
            path: Router.parse().path,
            step: ops.step || 7,
            index: index,
            pages: pages
        });
        me.cal();
    },
    'toPage<click>': function(e) {
        e.preventDefault();
        var me = this;
        me.$updater.set({
            index: e.params.page
        });
        me.cal();
    },
    'toPrev<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var idx = data.get('index');
        data.set({
            index: idx - 1
        });
        this.cal();
    },
    'toNext<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var idx = data.get('index');
        data.set({
            index: idx + 1
        });
        this.cal();
    }
});