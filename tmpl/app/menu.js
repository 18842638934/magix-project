/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Paths = [
    [-1, '/index', '首页'], //权限 url 标题
];

let Menus = [{
    text: '常用组件',
    icon: '&#xe695;',
    subs: [{
        text: '基础组件',
        canFolder: true,
        subs: [{
            text: '弹出框',
            icon: '&#xe600;',
            url: '/coms/dialog'
        }, {
            text: '验证组件',
            icon: '&#xe65d;',
            url: '/coms/validation'
        }, {
            text: '下拉框组件',
            icon: '&#xe663;',
            url: '/coms/dropdown'
        }, {
            text: '分页组件',
            icon: '&#xe624;',
            url: '/coms/pagination'
        }, {
            text: 'popover',
            icon: '&#xe609;',
            url: '/coms/popover'
        }, {
            text: '日历组件',
            icon: '&#xe688;',
            url: '/coms/calendar'
        }]
    }, {
        text: '其它组件',
        canFolder: true,
        subs: [{
            text: '全局提示',
            icon: '&#xe660;',
            url: '/coms/gtip'
        }, {
            text: '小时选择',
            icon: '&#xe62f;',
            url: '/coms/hourpicker'
        }, {
            text: '复制组件',
            icon: '&#xe607;',
            url: '/coms/copy'
        }, {
            text: 'taginput',
            icon: '&#xe60a;',
            url: '/coms/taginput'
        }, {
            text: '上传组件',
            icon: '&#xe62f;',
            url: '/coms/uploader'
        }, {
            text: '范围组件',
            icon: '&#xe607;',
            url: '/coms/range'
        }, {
            text: 'tree',
            icon: '&#xe60a;',
            url: '/coms/tree'
        }, {
            text: '颜色选择',
            icon: '&#xe62f;',
            url: '/coms/colorpicker'
        }, {
            text: 'popmenu',
            icon: '&#xe607;',
            url: '/coms/popmenu'
        }, {
            text: 'inputmask',
            icon: '&#xe63a;',
            url: '/coms/inputmask'
        }]
    }/*, {
        text: '示例菜单项2',
        canFolder: true,
        subs: [{
            text: '示例菜单4',
            icon: '&#xe64b;',
            url: ''
        }, {
            text: '示例菜单5',
            icon: '&#xe64a;',
            url: ''
        }, {
            text: '示例菜单6',
            icon: '&#xe642;',
            url: ''
        }]
    }*/]
}, {
    text: 'Mixins',
    icon: '&#xe667;',
    subs: [{
        text: 'mixins的介绍',
        icon: '&#xe626;',
        url: '/mixins/intro'
    }, {
        text: '加载loading',
        icon: '&#xe688;',
        url: '/mixins/loading'
    }, {
        text: 'checkbox联动',
        icon: '&#xe628;',
        url: '/mixins/checkbox'
    }, {
        text: 'checkbox保存状态',
        icon: '&#xe628;',
        url: '/mixins/checkbox-storestate'
    }, {
        text: '跨view共享数据',
        icon: '&#xe688;',
        url: '/mixins/store'
    }, {
        text: '大屏展示',
        icon: '&#xe688;',
        url: '/mixins/large-img'
    }, {
        text: '图表',
        icon: '&#xe632;',
        url: '/mixins/chart'
    }, {
        text: '节点震动',
        icon: '&#xe62a;',
        url: '/mixins/shake'
    }, {
        text: '基础动效',
        icon: '&#xe627;',
        url: '/mixins/fx'
    }]
}, {
    text: '常见页面',
    icon: '&#xe691;',
    subs: [{
        text: '列表页面',
        icon: '&#xe667;',
        url: '/pages/list'
    }, {
        text: '表单页面',
        icon: '&#xe617;',
        url: '/pages/form'
    }/*, {
        text: '底价设置',
        icon: '&#xe666;',
        url: '/markets/price'
    }*/]
}, {
    text: '其它特性',
    icon: '&#xe648;',
    subs: [{
        text: '离开提醒',
        icon: '&#xe628;',
        url: '/sundries/leavepage'
    }, {
        text: '弹框关闭提醒',
        icon: '&#xe665;',
        url: '/sundries/leavedlg'
    }, {
        text: '流控处理',
        icon: '&#xe629;',
        url: '/sundries/preservice'
    }]
}/*, {
    text: '数据报告',
    icon: '&#xe784;',
    subs: [{
        text: '推广报告',
        canFolder: true,
        subs: [{
            text: '订单报告',
            icon: '&#xe626;',
            url: '/reports/order'
        }, {
            text: '投放报告',
            icon: '&#xe62b;',
            url: '/reports/campaign'
        }, {
            text: '创意报告',
            icon: '&#xe629;',
            url: '/reports/creative'
        }, {
            text: '客户报告',
            icon: '&#xe628;',
            url: '/reports/advertiser'
        }, {
            text: '报告订阅',
            icon: '&#xe62a;',
            url: '/reports/subscribe'
        }]
    }, {
        text: 'PC媒体报告',
        canFolder: true,
        subs: [{
            text: '概览报告',
            icon: '&#xe630;',
            url: '/reports/overview-pc'
        }, {
            text: '推广位报告',
            icon: '&#xe62d;',
            url: '/reports/zone-pc'
        }, {
            text: '资源包报告',
            icon: '&#xe62f;',
            url: '/reports/group-pc'
        }, {
            text: '页面报告',
            icon: '&#xe633;',
            url: '/reports/page-pc'
        }, {
            text: '频道报告',
            icon: '&#xe632;',
            url: '/reports/channel-pc'
        }, {
            text: '网站报告',
            icon: '&#xe634;',
            url: '/reports/site-pc'
        }, {
            text: '播放器报告',
            icon: '&#xe669;',
            url: '/reports/player-pc'
        }]
    }, {
        text: 'WAP媒体报告',
        canFolder: true,
        subs: [{
            text: '概览报告',
            icon: '&#xe630;',
            url: '/reports/overview-m'
        }, {
            text: '推广位报告',
            icon: '&#xe62d;',
            url: '/reports/zone-m'
        }, {
            text: '资源包报告',
            icon: '&#xe62f;',
            url: '/reports/group-m'
        }, {
            text: '页面报告',
            icon: '&#xe633;',
            url: '/reports/page-m'
        }, {
            text: '频道报告',
            icon: '&#xe632;',
            url: '/reports/channel-m'
        }, {
            text: '网站报告',
            icon: '&#xe634;',
            url: '/reports/site-m'
        }, {
            text: '播放器报告',
            icon: '&#xe669;',
            url: '/reports/player-m'
        }]
    }, {
        text: 'APP媒体报告',
        canFolder: true,
        subs: [{
            text: '概览报告',
            icon: '&#xe630;',
            url: '/reports/overview-app'
        }, {
            text: '推广位报告',
            icon: '&#xe62d;',
            url: '/reports/zone-app'
        }, {
            text: '资源包报告',
            icon: '&#xe62f;',
            url: '/reports/group-app'
        }, {
            text: 'APP报告',
            icon: '&#xe634;',
            url: '/reports/site-app'
        }, {
            text: '播放器报告',
            icon: '&#xe669;',
            url: '/reports/player-app'
        }]
    }, {
        text: '私有交易市场报告',
        canFolder: true,
        subs: [{
            text: '定价交易报告',
            icon: '&#xe626;',
            url: '/reports/price'
        }, {
            text: '竞价交易报告',
            icon: '&#xe62b;',
            url: '/reports/bidprice'
        }]
    }]
}, {
    text: '收入优化',
    icon: '&#xe636;',
    subs: [{
        text: 'PC收入优化',
        subs: [{
            text: '平台管理',
            icon: '&#xe635;',
            url: '/incomes/platform'
        }, {
            text: '收入优化报告',
            icon: '&#xe636;',
            url: '/incomes/report'
        }]
    }, {
        text: 'WAP收入优化',
        subs: [{
            text: '平台管理',
            icon: '&#xe635;',
            url: '/incomes/platform-wap'
        }, {
            text: '收入优化报告',
            icon: '&#xe636;',
            url: '/incomes/report-wap'
        }]
    }, {
        text: 'APP收入优化',
        subs: [{
            text: '平台管理',
            icon: '&#xe635;',
            url: '/incomes/platform-app'
        }, {
            text: '收入优化报告',
            icon: '&#xe636;',
            url: '/incomes/report-app'
        }]
    }]
}, {
    text: '系统管理',
    icon: '&#xe69b;',
    subs: [{
        text: '配置管理',
        subs: [{
            text: '默认推广管理',
            icon: '&#xe63c;',
            url: '/systems/admanager'
        }, {
            text: '自定义模板配置',
            icon: '&#xe639;',
            url: '/systems/template'
        }, {
            text: '自定义播放器效果配置',
            icon: '&#xe65d;',
            url: '/systems/player'
        }, {
            text: '自定义推广接口',
            icon: '&#xe63e;',
            url: '/systems/interface'
        }, {
            text: '创意文件大小限制',
            icon: '&#xe63b;',
            url: '/systems/creative-limit'
        }, {
            text: '皮肤管理',
            icon: '&#xe63f;',
            url: '/systems/skin'
        }, {
            text: '角标管理',
            icon: '&#xe63a;',
            url: '/systems/corner'
        }, {
            text: '创意标签管理',
            icon: '&#xe68b;',
            url: '/systems/creative-tag-manager'
        }]
    }, {
        text: '运营工具',
        subs: [{
            text: '媒介计划模板',
            icon: '&#xe627;',
            url: '/systems/mplan-template'
        }]
    }, {
        text: '用户管理',
        subs: [{
            text: '用户管理',
            icon: '&#xe649;',
            url: '/systems/user'
        }, {
            text: '用户组管理',
            icon: '&#xe643;',
            url: '/systems/group'
        }, {
            text: '角色管理',
            icon: '&#xe647;',
            url: '/systems/role'
        }]
    }, {
        text: '系统日志',
        subs: [{
            text: '投放日志',
            icon: '&#xe641;',
            url: '/systems/log'
        }]
    }]
}*/];

let Titles = {};
let Routes = {};
let Breadcrumbs = {};
let InitRoutes = (mainView) => {
    if (!InitRoutes.$inited) {
        InitRoutes.$inited = 1;
        for (let i = 0, one, p, u, text, a; i < Paths.length; i++) {
            one = Paths[i];
            p = one[0];
            u = one[1];
            text = one[2];
            a = text.split('-');
            Breadcrumbs[u] = a.reverse();
            Titles[u] = text;
            Routes[u] = mainView;
        }
    }
};
let GenKey = (str) => {
    let keys = [];
    for (let i = 0; i < str.length; i++) {
        keys.push(str.charCodeAt(i).toString(32));
    }
    return 'k' + keys.join('');
};
let UrlsMap = {};
let UrlsToMainMap = {};
let MenusMap = {};
let SubsMap = {};
let InitMenus = () => {
    if (InitMenus.$inited) return;
    InitMenus.$inited = 1;
    for (let i = Menus.length - 1, menu; i >= 0; i--) {
        menu = Menus[i];
        menu.key = GenKey(menu.text);
        let url = '';

        for (let j = menu.subs.length - 1, subMenu; j >= 0; j--) {
            subMenu = menu.subs[j];
            if (subMenu.icon) {
                url = subMenu.url;
                UrlsMap[url] = subMenu;
                UrlsToMainMap[url] = menu.key;
                subMenu.key = url.replace(/\//g, 'x');
                subMenu.pathText = [menu.text, subMenu.text];
                Paths.push([subMenu.permission || -1, url, subMenu.text + '-' + menu.text]);
            } else if (subMenu.subs && subMenu.subs.length) {
                subMenu.key = GenKey(subMenu.text);
                subMenu.pathText = [menu.text, subMenu.text];
                SubsMap[subMenu.key] = subMenu;
                for (let x = subMenu.subs.length - 1, item; x >= 0; x--) {
                    item = subMenu.subs[x];
                    url = item.url;
                    UrlsMap[url] = subMenu;
                    UrlsToMainMap[url] = menu.key;
                    item.key = url.replace(/\//g, 'x');
                    item.pathText = [menu.text, subMenu.text, item.text];
                    Paths.push([item.permission || -1, url, [item.text, subMenu.text, menu.text].join('-')]);
                }
                if (!subMenu.subs.length) {
                    menu.subs.splice(j, 1);
                }
            }
        }
        menu.url = url;
        MenusMap[menu.key] = menu.subs;
        var first = menu.subs[0];
        if (first.canFolder) {
            first.folderExpand = true;
        }
    }
};
module.exports = {
    route(mainView) {
        InitMenus();
        InitRoutes(mainView);
        return {
            breadcrumbs: Breadcrumbs,
            titles: Titles,
            routes: Routes
        };
    },
    menu() {
        InitMenus();
        return {
            menus: Menus,
            urlsMap: UrlsMap,
            urlsToMainMap: UrlsToMainMap,
            menusMap: MenusMap,
            subsMap: SubsMap
        };
    }
};