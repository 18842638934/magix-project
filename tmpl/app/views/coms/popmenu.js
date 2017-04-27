/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let CheckboxLinkage = require('@app/mixins/checkbox-linkage');
let GTip = require('@app/mixins/gtip');
Magix.applyStyle('@popmenu.css');
module.exports = Magix.View.extend({
    tmpl: '@popmenu.html',
    mixins: [CheckboxLinkage, GTip],
    render() {
        let me = this;
        me.updater.digest({
            viewId: me.id
        });
    },
    'storeActiveMenu<click>' (e) {
        let vf = e.eventTarget.vframe;
        if (vf) {
            this.$activeMenu = vf;
            this.$index = e.params.index;
        }
    },
    'hideActiveMenu<click>' () {
        let vf = this.$activeMenu;
        if (vf) {
            delete this.$activeMenu;
            delete this.$index;
            vf.invoke('hide');
        }
    },
    'showMenuItem<click>' (e) {
        this.gtipRT(this.$index + ':' + e.eventTarget.innerHTML);
    }
});