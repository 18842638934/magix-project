/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('@more-links.css');
var CSSNames = 'names@more-links.css';
var MoreLinks = require('./partials/more-links');
module.exports = Magix.View.extend({
    tmpl: '@more-links.html',
    tmplData: '@more-links.html:data',
    ctor: function() {
        MoreLinks.setup();
        this.on('destroy', MoreLinks.teardown);
    },
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
    },
    'hover<mouseout,mouseover>': function(e) {
        $(e.current)[e.type == 'mouseover' ? 'addClass' : 'removeClass'](CSSNames.over);
    },
    'showBatch<click>': function(e) {
        MoreLinks.show(e.current, $('#batch_' + this.id));
    },
    'showMore<click>': function(e) {
        MoreLinks.show(e.current, $('#more_' + this.id));
    }
});