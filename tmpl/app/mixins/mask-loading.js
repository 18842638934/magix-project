/*
    author:xinglie.lkf@alibaba-inc.com
 */
let $ = require('$');
let MaskId = 'm_loading';
let Magix = require('magix');
Magix.applyStyle('@mask-loading.css');
let Tmpl = '@mask-loading.html';
module.exports = {
    ctor() {
        let me = this;
        me.on('rendercall', () => {
            if (me.$uiRendered) {
                me.showLoading();
            }
        });
        me.on('rendered', () => {
            me.$uiRendered = true;
            me.hideLoading();
        });
    },
    buildLoading() {
        let node = $('#' + MaskId);
        if (!node.length) {
            $(document.body).append(Tmpl);
            node = $('#' + MaskId);
        }
        return node;
    },
    showLoading() {
        let me = this;
        let node = me.buildLoading();
        let $win = $(window);
        let left = (($win.width() - 150) / 2) | 0;
        let top = (($win.height() - 40) / 2) | 0;
        node.css({
            left: left,
            top: top,
            display: 'block'
        });
    },
    hideLoading() {
        let me = this;
        let node = me.buildLoading();
        node.css({
            display: 'none'
        });
    }
};