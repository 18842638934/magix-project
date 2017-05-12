/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@uploader.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@uploader.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'showError<error>' (e) {
        this.gtipRT(e.error);
        console.log(e.error);
    },
    'showProgress<progress>'(e){
        console.log(e.percent);
    }
});