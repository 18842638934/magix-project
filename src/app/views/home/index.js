define('app/views/home/index',['magix'],function(require,exports,module){
/*Magix*/
/*
    author:xinglie.lkf@taobao.com
 */
var Magix=require('magix');
module.exports=Magix.View.extend({
    tmpl:"Magix 示例项目",
    render:function(){
        var me=this;
        me.setHTML(me.id,me.tmpl);
    }
});
});