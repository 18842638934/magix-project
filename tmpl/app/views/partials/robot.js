'#snippet';
/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@robot.css');
module.exports = Magix.View.extend({
    tmpl: '@robot.html',
    render() {
        let me = this;
        $('#' + me.id).addClass('@robot.css:robot');
        me.updater.digest();
    }
});