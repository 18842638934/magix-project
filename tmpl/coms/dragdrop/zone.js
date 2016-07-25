/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var DD = require('./index');
var $ = require('$');
var Autoscroll = require('../autoscroll/index');
Magix.applyStyle('@zone.css');
module.exports = Magix.Base.extend({
    ctor: function(e) {
        var me = this;
        me.$dir = e.dir;
        me.$zones = e.zones;
    },
    destroy: function() {

    }
});