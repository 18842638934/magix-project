/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let Shake = require('@app/mixins/shake');
module.exports = Magix.View.extend({
    tmpl: '@shake.html',
    mixins: [Shake],
    render() {
        let me = this;
        me.updater.digest({
            viewId: me.id
        });
    },
    'shake<click>' () {
        this.shakeNode('#content_' + this.id);
    }
});