/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@preservice.css');
let Service = require('@app/services/service');
let Storage = require('@app/mixins/storage');
module.exports = Magix.View.extend({
    tmpl: '@preservice.html',
    mixins: [Service],
    render() {
        let me = this;
        me.updater.digest();
        Storage.on('change', (e) => {
            console.log(e);
        });
    },
    'preservice<click>' (e) {
        this.fetch([{
            name: 'list1',
            ctrl: 'login1'
        }, {
            name: 'list1',
            ctrl: 'login2'
        }], (e, bag1, bag2) => {
            console.log('获取到数据', e, bag1, bag2);
        });
    },
    'storage<click>' (e) {
        Storage.set('key', Magix.guid());
    }
});