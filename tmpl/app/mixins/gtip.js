/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let TipHeight = 65; //写死
let Space = {
    vertical: 5,
    horizontal: 10
};
let Docks = {
    lt(tip, index) {
        tip.css({
            top: TipHeight * index + Space.vertical * (index + 1),
            left: Space.horizontal
        });
    },
    rt(tip, index) {
        tip.css({
            top: TipHeight * index + Space.vertical * (index + 1),
            right: Space.horizontal
        });
    },
    lb(tip, index) {
        tip.css({
            bottom: TipHeight * index + Space.vertical * (index + 1),
            left: Space.horizontal
        });
    },
    rb(tip, index) {
        tip.css({
            bottom: TipHeight * index + Space.vertical * (index + 1),
            right: Space.horizontal
        });
    }
};
Magix.applyStyle('@gtip.css');
let GTipManager = {
    calc(dock) {
        let me = this;
        let list = me['$' + dock];
        if (list && list.length) {
            for (let i = 0, tip; i < list.length; i++) {
                tip = list[i];
                let fn = Docks[dock];
                fn(tip, i);
            }
        }
    },
    add(tip, dock) {
        if (!dock) {
            dock = 'rt';
        }
        let me = this;
        if (!Docks[dock]) {
            throw new Error('mx-gip unsupport dock:' + dock);
        }
        let list = me['$' + dock] || (me['$' + dock] = []);
        list.push(tip);
        tip.on('tipclose', () => {
            me.remove(tip, dock);
        });
        me.calc(dock);
    },
    remove(tip, dock) {
        tip.off('close');
        let me = this;
        let list = me['$' + dock];
        for (let i = list.length - 1; i >= 0; i--) {
            let t = list[i];
            if (t == tip) {
                list.splice(i, 1);
                break;
            }
        }
        me.calc(dock);
    }
};
module.exports = Magix.View.extend({
    tmpl: '@gtip.html',
    init(extra) {
        this.$extra = extra;
        this.on('destroy', () => {
            this.$oNode.trigger('tipclose').remove();
        });
    },
    render() {
        let me = this;
        let oNode = $('#' + me.id);
        oNode.addClass('@gtip.css:gtip');
        me.$oNode = oNode;
        me.updater.digest({
            tip: me.$extra
        });
        if (me.$extra.timeout) {
            setTimeout(me.wrapAsync(() => {
                me.close();
            }), me.$extra.timeout);
        }
        setTimeout(me.wrapAsync(() => {
            oNode.addClass('@gtip.css:fadein');
        }), 20);
    },
    close() {
        this.$oNode.addClass('@gtip.css:fadeout');
        setTimeout(this.wrapAsync(() => {
            this.owner.unmountVframe();
        }), 300);
    }
}, {
    gtipShow(ops) {
        let id = Magix.guid('gtip-');
        $('body').append(`<div id="${id}" />`);
        this.owner.mountVframe(id, '@moduleId', ops);
        GTipManager.add($('#' + id), ops.dock);
    },
    gtipRT(msg, timeout) {
        this.gtipShow({
            msg: msg,
            dock: 'rt',
            timeout: timeout || 3000
        });
    },
    gtipRB(msg, timeout) {
        this.gtipShow({
            msg: msg,
            dock: 'rb',
            timeout: timeout || 3000
        });
    },
    gtipLT(msg, timeout) {
        this.gtipShow({
            msg: msg,
            dock: 'lt',
            timeout: timeout || 3000
        });
    },
    gtipLB(msg, timeout) {
        this.gtipShow({
            msg: msg,
            dock: 'lb',
            timeout: timeout || 3000
        });
    }
});