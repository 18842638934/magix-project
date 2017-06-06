let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@nav.less');
let Menu = require('@app/menu');
let MenuInfo = Menu.menu();
let Menus = MenuInfo.menus;
let UrlsToMainMap = MenuInfo.urlsToMainMap;
let SubsMap = MenuInfo.subsMap;
let MenusMap = MenuInfo.menusMap;
let Triangle = {
    triangle: {
        m: {
            x: -1,
            y: -1
        },
        n: {
            x: -1,
            y: 0
        },
        p: {
            x: -1,
            y: -1
        }
    },
    getVirtualCoordinate(e) {
        let me = this;
        let offset = me.$node.offset();
        return {
            x: e.pageX - offset.left,
            y: me.$node.outerHeight() - (e.pageY - offset.top)
        };
    },
    update(node) {
        let me = this;
        let triangle = me.triangle;
        me.$node = node;
        let width = node.outerWidth();
        triangle.m.x = width;
        triangle.m.y = node.outerHeight();
        triangle.n.x = width;
    },
    updatePoint(e) {
        let me = this;
        me.triangle.p = me.getVirtualCoordinate(e);
    },
    isInTriangle(e) {
        let n = this;
        let t = n.getVirtualCoordinate(e);
        //以下判断来自mui https://g.alicdn.com/mui/category-menu/3.0.4/??index.js,count-down.js,triangle.js
        let triangle = n.triangle;
        return t.x > triangle.m.x || t.x >= triangle.p.x && (t.y >= triangle.p.y && (triangle.m.y - t.y) / (triangle.m.x - t.x) >= (triangle.m.y - triangle.p.y) / (triangle.m.x - triangle.p.x) || t.y < triangle.p.y && (triangle.n.y - t.y) / (triangle.n.x - t.x) < (triangle.n.y - triangle.p.y) / (triangle.n.x - triangle.p.x));
    }
};
module.exports = Magix.View.extend({
    tmpl: '@nav.html',
    init() {
        let me = this;
        Magix.Router.on('changed', () => {
            me.highlight();
            me.highlightSub();
        });
    },
    render() {
        let me = this;
        let node = $('#' + me.id);
        node.addClass('@nav.less:nav');
        me.$node = node;
        me.updater.digest({
            viewId: me.id,
            menus: Menus
        });
        me.$subs = $('#subs_' + me.id);
        Triangle.update(me.$node);
        me.highlight();
    },
    highlight() {
        let loc = Magix.Router.parse();
        let path = loc.path;
        if (!UrlsToMainMap[path]) {
            path = path.replace(/\-[^-]+$/, '');
        }
        let key = UrlsToMainMap[path];
        if (path == '/index') {
            key = 'index';
        }
        let me = this;
        let main = $('#main_' + me.id);
        main.find('li').removeClass('@nav.less:menu-item-active').removeClass('@nav.less:menu-item-inactive');
        me.$mainMenu = main.find('[data-key=' + key + ']').addClass('@nav.less:menu-item-active');
        me.$mainMenuKey = key;
    },
    highlightSub() {
        let me = this;
        let loc = Magix.Router.parse();
        let path = loc.path;
        if (!UrlsToMainMap[path]) {
            path = path.replace(/\-[^-]+$/, '');
        }
        me.$subs.find('a').removeClass('@nav.less:sub-child-link-active');
        let node = me.$subs.find('[href="#!' + path + '"]').addClass('@nav.less:sub-child-link-active');
        let ul = node.parents('ul');
        if (ul.css('display') == 'none') {
            let div = ul.prev('div[mx-click]');
            if (div.length) {
                div.trigger('click');
            }
        }
    },
    toggleSubs(key, target, menuKey) {
        let me = this;
        menuKey = key;
        if (!key) menuKey = 'index';
        if (menuKey != me.$mainMenuKey) {
            me.$mainMenu.addClass('@nav.less:menu-item-inactive');
        } else {
            me.$mainMenu.removeClass('@nav.less:menu-item-inactive');
        }
        let flag = key + '?' + (key ? true : false);
        if (me.$flag == flag) {
            return;
        }
        me.$flag = flag;
        if (me.$menu) {
            me.$menu.removeClass('@nav.less:menu-hover');
        }
        if (key) {
            if (me.$key != key) {
                me.$key = key;
                let subs = MenusMap[key];
                me.updater.set({
                    subs: subs
                });
            }
        }
        me.$menu = $(target).addClass('@nav.less:menu-hover');
        me.updater.digest({
            showSub: key ? true : false
        });
        if (key) {
            me.highlightSub();
        }
    },
    hideSubs(immediately) {
        let me = this;
        delete me.$preventHide;
        let fn = () => {
            if (me.$menu) {
                me.$menu.removeClass('@nav.less:menu-hover');
                me.$mainMenu.removeClass('@nav.less:menu-item-inactive');
                delete me.$menu;
            }
            delete me.$flag;
            me.updater.digest({
                showSub: false
            });
        };
        if (immediately) {
            console.log('immediately hide');
            fn();
        } else {
            me.$hideTimer = setTimeout(fn, 100);
        }
    },
    'startShowSubs<mouseover>' (e) {
        let flag = !Magix.inside(e.relatedTarget, e.eventTarget);
        if (flag) {
            let me = this;
            Triangle.updatePoint(e);
            clearTimeout(me.$showTimer);
            let target = e.eventTarget;
            let key = e.params.key;
            let show = me.updater.get('showSub');
            if (key && !show) {
                me.toggleSubs(key, target);
            } else {
                me.$showTimer = setTimeout(() => {
                    me.toggleSubs(key, target);
                }, 200);
            }
        }
    },
    'stopHide<mouseover>' (e) {
        let flag = !Magix.inside(e.relatedTarget, e.eventTarget);
        if (flag) {
            let me = this;
            clearTimeout(me.$hideTimer);
        }
    },
    'hideSubs<mouseout>' (e) {
        let flag = !Magix.inside(e.relatedTarget, e.eventTarget);
        if (flag) {
            let me = this;
            if (me.$preventHide) {
                delete me.$preventHide;
                return;
            }
            clearTimeout(me.$showTimer);
            me.hideSubs();
        }
    },
    'toggleSubMenus<click>' (e) {
        let target = $(e.eventTarget);
        let menu = SubsMap[e.params.key];
        if (target.hasClass('iconfont')) {
            target = target.parent();
        }
        let ul = target.next();
        let icon = target.find('.iconfont');
        if (ul.css('display') == 'none') {
            menu.folderExpand = true;
            ul.slideDown();
            icon.html('&#xe786;');
        } else {
            menu.folderExpand = false;
            ul.slideUp();
            icon.html('&#xe692;');
        }
    },
    'showSubs<mousemove>' (e) {
        let me = this;
        if (!Triangle.isInTriangle(e)) {
            me.toggleSubs(e.params.key, e.eventTarget);
        }
    },
    'preventHide<contextmenu>' () {
        let me = this;
        me.$preventHide = true;
        if (me.$listened) return;
        me.$listened = true;
        let doc = $(document);
        let fn = (e) => {
            if (!Magix.inside(e.target, me.id)) {
                delete me.$listened;
                doc.off('mousemove mouseup', fn);
                me.hideSubs(true);
            }
        };
        doc.on('mousemove mouseup', fn);
    },
    '$doc<navslide>' () {
        this.$node.toggleClass('@nav.less:nav-close');
    },
    '$doc<navslidend>' () {
        console.log('update triangle');
        Triangle.update(this.$node);
    },
    '$win<resize>' () {
        console.log('update triangle');
        Triangle.update(this.$node);
    }
});