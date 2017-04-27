'top@./vendor/inputmask.js';
/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
module.exports = Magix.View.extend({
    ctor(extra) {
        let me = this;
        me.$mask = extra.mask;
        me.on('destroy', () => {
            let im = me.$inputmask;
            if (im) {
                im.unmask();
            }
        });
    },
    render() {
        let me = this;
        me.$inputmask = new $.Inputmask('#' + me.id, {
            mask: me.$mask
        });
    }
});