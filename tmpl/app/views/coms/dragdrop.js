/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@dragdrop.css');
var Zone = require('@coms/dragdrop/izone');
module.exports = Magix.View.extend({
    tmpl: '@dragdrop.html',
    tmplData: '@dragdrop.html:data',
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
        //var dragNode;
        var zone = new Zone({
            anchorPosition: Zone.ANCHOR_HORIZONTAL
        });
        zone.addZone('#dd_' + me.id);
        zone.addZone('#dd2_' + me.id);
        zone.addZone('#dd3_' + me.id);
        // zone.on('dragstart', function(e) {
        //     console.log(e);
        //     dragNode = e.child;
        // });
        // zone.on('hoverchildchanged', function(e) {
        //     console.log(e);
        // });
        // zone.on('hoverzonechanged', function(e) {
        //     console.log(e);
        // });
        // zone.on('hoverchildplacechanged', function(e) {
        //     console.log(e.child, e.position, e.side);
        // });
        // zone.on('dragend', function(e) {
        //     console.log('dragNode', dragNode, 'dropNode', e.child);
        // });
        console.log(zone);
        me.capture('zone', zone);
    }
});