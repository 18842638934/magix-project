/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
let Doc = $(document);
let Menu = require('@app/menu');
let Dialog = require('@app/mixins/dialog');
Magix.applyStyle('@header.less');
module.exports = Magix.View.extend({
    tmpl: '@header.html',
    mixins: [Dialog],
    init() {
        let me = this;
        me.observe({
            path: true
        });
    },
    render() {
        let routes = Menu.route();
        let me = this;
        let loc = Magix.Router.parse();
        let bcs = routes.breadcrumbs[loc.path];
        if (bcs && bcs.length) {
            bcs = bcs.join(' > ');
        } else {
            bcs = '';
        }
        me.updater.digest({
            bcs: bcs,
            userName: '彳刂',
            viewId: me.id
        });
    },
    'triggerNav<click>' () {
        let node = $('#header_' + this.id);
        let close = '@header.less:header-new-close';
        node.toggleClass(close);
        let isShrink = node.hasClass(close);
        Doc.data('navshrink', isShrink).trigger({
            type: 'navslide',
            shrink: isShrink
        });
        setTimeout(this.wrapAsync(() => {
            Doc.trigger('navslidend');
        }), 300);
    },
    'logout<click>' () {
        this.alert('仅退出示意，请继续浏览^_*');
    },
    'showAgreement<click>' () {
        this.mxDialog('@./agreement');
    },
    'changePassword<click>' () {
        this.mxDialog('@./password');
    }
});