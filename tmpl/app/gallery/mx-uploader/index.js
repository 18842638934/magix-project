/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.css');
let Uploader = Magix.Base.extend({
    destroy() {
        let me = this;
        me.$oust = 1;
    }
});
let Iframe = Uploader.extend({
    send(input, data, callback) {
        let form = input.form;
        let me = this;
        let id = Magix.guid('up');
        if (!form) {
            $('body').append('<div id="' + id + '_temp" class="@index.css:cnt"><form target="' + id + '"></form></div>');
            let cnt = $('#' + id + '_temp');
            form = cnt.find('form');
            form.append(input);
            form = form[0];
        }
        $('<iframe name="' + id + '" id="' + id + '" style="display:none;"></iframe>').insertAfter(form).on('load', () => {
            if (!me.$oust) {
                let iframe = event.target;
                let $body = $(iframe.contentWindow.document.body);
                $body.find('script').remove();
                let response = $.trim($body.text());
                $(iframe).remove();
                $('#' + id + '_temp').remove();
                try {
                    callback(null, new Function('return ' + response)());
                } catch (e) {
                    callback(e);
                }
            }
        }).on('error', (e) => {
            if (!me.$oust) {
                $('#' + id + '_temp').remove();
                callback(e);
            }
        });
        form.target = id;
        form.action = data.get('action');
        form.method = 'POST';
        form.enctype = 'multipart/form-data';

        form.submit();
    }
});
module.exports = Magix.View.extend({
    init(extra) {
        let me = this;
        me.updater.set({
            name: extra.name || 'file',
            action: extra.action || '',
            multiple: extra.multiple,
            accept: extra.accept
        });
        me.capture('transport', new Iframe());
    },
    add() {
        let me = this;
        let nodeId = 'file_' + me.id;
        let node = $('#' + nodeId);
        if (node.length) {
            node.remove();
        }
        let data = me.updater.get();
        $('#' + me.id).append(me.wrapEvent('<input id="' + nodeId + '" type="file" class="@index.css:file" mx-change="\u001f\u001eupload()" name="' + data.name + '" />')).addClass('@index.css:pr');
        node = $('#' + nodeId);
        if (data.multiple) node.attr('multiple', 'multiple');
        if (data.accept) node.prop('accept', data.accept);
    },
    render() {
        let me = this;
        me.add();
    },
    'upload<change>' (e) {
        let me = this;
        let node = $('#' + me.id);
        let event = $.Event('start', {
            files: e.eventTarget.files
        });
        node.trigger(event);
        if (event.isDefaultPrevented()) {
            me.add();
            return;
        }
        let transport = me.capture('transport');
        transport.send(e.target, me.updater, (err, response) => {
            if (err) {
                node.trigger({
                    type: 'error',
                    error: err
                });
            } else {
                node.trigger({
                    type: 'success',
                    response: response
                });
            }
        });
        me.add();
    }
});