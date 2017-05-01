/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@preservice.css');
let Service = require('@app/services/service');
module.exports = Magix.View.extend({
    tmpl: '@preservice.html',
    mixins: [Service],
    render() {
        let me = this;
        me.updater.digest();
    },
    'preservice<click>' (e) {
        this.fetch([{
            name: 'list1',
            ctrl: 'login1'
        }, {
            name: 'list1',
            ctrl: 'login2'
        }], (e, bag1, bag2) => {
            console.log('获取到数据',e, bag1, bag2);
        });
    }
});