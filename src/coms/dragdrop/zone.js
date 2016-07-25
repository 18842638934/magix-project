define('coms/dragdrop/zone',['magix','./index','$','../autoscroll/index'],function(require,exports,module){
/*Magix ,DD ,$ ,Autoscroll */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var DD = require('./index');
var $ = require('$');
var Autoscroll = require('../autoscroll/index');
Magix.applyStyle('mp-a5c',"");
module.exports = Magix.Base.extend({
    ctor: function(e) {
        var me = this;
        me.$dir = e.dir;
        me.$zones = e.zones;
    },
    destroy: function() {

    }
});
});