/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let Router = Magix.Router;
module.exports = Magix.View.extend({
    tmpl: '@default.html',
    init() {
        let me = this;
        me.observe({
            path: true
        });
    },
    render() {
        let me = this;
        let loc = Router.parse();
        me.updater.digest({
            mainView: 'app/views' + loc.path
        });
    }
});