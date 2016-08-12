/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Router = Magix.Router;
var ShrinkCSS = '@./partials/header-sidebar.css:shrink';
module.exports = Magix.View.extend({
    tmpl: '@default.html',
    tmplData: '@default.html:data',
    ctor: function() {
        var me = this;
        me.observe(null, true);
        $(window).on('resize', function() {
            me.resize();
        });
    },
    render: function() {
        var me = this;
        var loc = Router.parse();
        me.$updater.set({
            mainView: 'app/views' + loc.path
        }).digest();
    },
    resize: function() {
        var main = $('#inmain');
        var left = $('#inmain').hasClass(ShrinkCSS) ? 200 : 0;
        main.css({
            width: $(window).width() - left
        });
    },
    'resizeMain<toggleSidebar>': function(e) {
        this.resize();
    }
});