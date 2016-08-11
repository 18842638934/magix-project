/*
    author:xinglie.lkf@taobao.com
 */
'ref@../view-subs.css';
var Magix = require('magix');
var Form = require('@coms/form/index');
var $ = require('$');
module.exports = Form.extend({
    tmpl: '@view-subs-popup.html',
    ctor: function(extra) {
        var me = this;
        var creative = extra.creative;
        if (!creative.others.length) creative.others.push('');
        me.$updater.set({
            id: me.id,
            creative: creative,
            others: creative.others
        });
        me.addValidator({
            'others.*': function(v, key) {
                if (!v) {
                    $('#others_' + key + '_' + me.id).addClass('validator-error');
                    return false;
                } else {
                    $('#others_' + key + '_' + me.id).removeClass('validator-error');
                }
            },
            'creative.respondTime': function(v) {
                if (!v) {
                    $('#respondTime_' + me.id).addClass('validator-error');
                    return false;
                } else {
                    $('#respondTime_' + me.id).removeClass('validator-error');
                }
            }
        });
    },
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'addOthers<click>': function() {
        var others = this.$updater.get('others');
        others.push('');
        this.$updater.set({
            others: others
        }).digest();
    }
});