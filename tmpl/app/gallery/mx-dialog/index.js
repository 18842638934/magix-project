/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@index.less');
let $ = require('$');
let DialogZIndex = 500;
let CacheList = [];
let RemoveCache = (view) => {
    for (let i = CacheList.length - 1, one; i >= 0; i--) {
        one = CacheList[i];
        if (one.id == view.id) {
            CacheList.splice(i, 1);
            break;
        }
    }
};
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        let app = $('#app');
        me.on('destroy', () => {
            RemoveCache(me);
            DialogZIndex -= 2;
            if (DialogZIndex == 500) {
                app.removeClass('@index.less:blur');
            }
            $('#' + me.id).trigger('close').remove();
        });
        if (!Magix.has(extra, 'closable')) {
            extra.closable = true;
        }
        me.updater.set(extra);
        if (DialogZIndex == 500) {
            app.addClass('@index.less:blur');
        }
        DialogZIndex += 2;
        CacheList.push(me);
    },
    render() {
        let me = this;
        let updater = me.updater;
        let data = updater.get();
        updater.set({
            zIndex: DialogZIndex,
            viewId: me.id
        }).digest();
        $('#' + me.id).show();
        $('#focus_' + me.id).focus();
        me.owner.mountVframe('cnt_' + me.id, data.view, data);
        setTimeout(me.wrapAsync(() => {
            $('#body_' + me.id).removeClass('@index.less:anim-body');
            $('#mask_' + me.id).removeClass('@index.less:anim-mask');
        }), 300);
    },
    fireLeave(e) {
        let vf = Magix.Vframe.get('cnt_' + this.id);
        vf.invoke('fire', ['viewunload', e]);
    },
    'close<click>' () {
        $('#' + this.id).trigger('dlg_close');
    },
    '$doc<keyup>' (e) {
        if (e.keyCode == 27) { //esc
            let dlg = CacheList[CacheList.length - 1];
            if (dlg == this && dlg.updater.get('closable')) {
                let node = $('#' + dlg.id);
                node.trigger('dlg_close');
            }
        }
    }
}, {
    show(view, options) {
        let id = Magix.guid('dlg_');
        $(document.body).append('<div id="' + id + '" style="display:none" />');
        let vf = view.owner.mountVframe(id, '@moduleId', options);
        let node = $('#' + id);
        let suspend;
        return node.on('dlg_close', () => {
            if (!node.data('closing') && !suspend) {
                let resume = () => {
                    node.data('closing', 1);
                    $('#body_' + id).addClass('@index.less:anim-body-out');
                    $('#mask_' + id).addClass('@index.less:anim-mask-out');
                    setTimeout(() => {
                        view.owner.unmountVframe(id);
                    }, 200);
                };
                let e = {
                    prevent() {
                        suspend = 1;
                    },
                    forward() {
                        e.p = 1;
                        suspend = 0;
                        resume();
                    },
                    backward() {
                        e.p = 1;
                        suspend = 0;
                    }
                };
                vf.invoke('fireLeave', e);
                if (!suspend && !e.p) {
                    resume();
                }
            }
        });
    }
});