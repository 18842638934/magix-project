'top@./vendor/clipboard.js';
/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
module.exports = Magix.View.extend({
    init: function(extra) {
        let me = this;
        me.$node = extra.node;
    },
    render: function() {
        let me = this;
        let owner = $('#' + me.id);
        let clipboard = new window.Clipboard(Magix.node(me.id), {
            target: function() {
                return $(me.$node)[0];
            }
        });
        clipboard.on('success', (e) => {
            e.clearSelection();
            owner.trigger('success');
        });
        clipboard.on('error', () => {
            owner.trigger('error');
        });
        me.capture('clipboard', clipboard);
    }
});