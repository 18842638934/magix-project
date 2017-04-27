/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let MaskLoading = require('@app/mixins/mask-loading');
module.exports = Magix.View.extend({
    tmpl: '@loading.html',
    mixins: [MaskLoading],
    init() {
        this.$count = 1;
    },
    render(refresh) {
        let me = this;
        if (refresh) {
            setTimeout(me.wrapAsync(() => {
                me.updater.digest({
                    count: me.$count
                });
            }), 3000);
        } else {
            me.updater.digest({
                count: me.$count
            });
        }
    },
    'refresh<click>' () {
        this.$count++;
        this.render(true);
    }
});