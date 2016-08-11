/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('@header-sidebar.css');
var CSSNames = 'names@header-sidebar.css[fixed,expand,shrink]';
module.exports = Magix.View.extend({
    tmpl: '@header-sidebar.html',
    ctor: function() {
        var me = this;
        me.$updater.set({
            menus: []
        });
        var win = $(window);
        win.on('resize', function() {
            me.resize();
        }).on('scroll', function() {
            me.toggleFixed();
        });
    },
    render: function() {
        var me = this;
        me.$updater.digest();
        me.resize();
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
        console.log(url, me.$updater.get('url'));
        me.$updater.set({
            url: url
        }).digest();
    },
    resize: function() {
        var height = Math.max($(window).height(), 60);
        $('#' + this.id).height(height);
    },
    toggleFixed: function() {
        var me = this;
        var top = $(window).scrollTop();
        if (top > 50) {
            if (!me.$fixed) {
                me.$fixed = true;
                $('#' + this.id).addClass(CSSNames.fixed);
            }
            var left = $(window).scrollLeft();
            $('#' + this.id).css({
                left: -left
            });
        } else {
            if (me.$fixed) {
                me.$fixed = false;
                $('#' + this.id).removeClass(CSSNames.fixed);
                $('#' + this.id).css({
                    left: 0
                });
            }
        }
    }
});