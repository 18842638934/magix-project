/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('@header-sidebar.css');
var CSSNames = 'names@header-sidebar.css[expand,shrink]';
module.exports = Magix.View.extend({
    tmpl: '@header-sidebar.html',
    tmplData: '@header-sidebar.html:data',
    ctor: function() {
        var me = this;
        me.$updater.set({
            menus: []
        });
    },
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    updateMenu: function(subMenus, url) {
        var main = $('#inmain');
        var me = this;
        if (subMenus) {
            me.$updater.set({
                menus: subMenus
            });
            me.updateUrl(url);
            if (!main.hasClass(CSSNames.shrink)) {
                $('#' + this.id).addClass(CSSNames.expand);
                $('#inmain').addClass(CSSNames.shrink);
                me.owner.parent().invoke('toggleSidebar');
            }
        } else if (main.hasClass(CSSNames.shrink)) {
            $('#' + this.id).removeClass(CSSNames.expand);
            $('#inmain').removeClass(CSSNames.shrink);
            me.owner.parent().invoke('toggleSidebar');
        }
    },
    updateUrl: function(url) {
        var me = this;
        me.$updater.set({
            url: url
        }).digest();
    }
});