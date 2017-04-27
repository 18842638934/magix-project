'top@../views/partials/alert.js';
'top@../views/partials/confirm.js';
let Magix = require('magix');
let $ = require('$');
let Win = $(window);
module.exports = {
    alert(content, enterCallback, title) {
        this.confirm(content, enterCallback, null, title, 'alert');
    },
    confirm(content, enterCallback, cancelCallback, title, view) {
        this.mxDialog('app/views/partials/' + (view || 'confirm'), {
            body: content,
            cancelCallback: cancelCallback,
            enterCallback: enterCallback,
            title: title,
            modal: true,
            width: 400,
            closable: false,
            left: (Win.width() - 400) / 2,
            top: Math.max((Win.height() - 220) / 2, 0)
        });
    },
    mxDialog(view, options) {
        let me = this;
        let dlg;
        let closeCallback;
        let dOptions = {
            view: view
        };
        seajs.use(['app/gallery/mx-dialog/index', view], me.wrapAsync((MxDialog, V) => {
            let key = '$dlg_' + view;
            if (me[key]) return;
            me[key] = 1;
            Magix.mix(dOptions, V.dialogOptions);
            Magix.mix(dOptions, options);
            if (!dOptions.width) dOptions.width = 500;
            if (!dOptions.left) dOptions.left = (Win.width() - dOptions.width) / 2;
            if (!dOptions.top) dOptions.top = 100;
            dOptions.dialog = {
                close() {
                    if (dlg) dlg.trigger('dlg_close');
                }
            };
            dlg = MxDialog.show(me, dOptions);
            dlg.on('close', () => {
                delete me[key];
                if (closeCallback) {
                    closeCallback();
                }
            });
        }));
        return {
            close() {
                if (dlg) dlg.trigger('dlg_close');
            },
            whenClose(fn) {
                closeCallback = fn;
            }
        };
    }
};