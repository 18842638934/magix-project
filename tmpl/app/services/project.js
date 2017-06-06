/*
    author:xinglie.lkf@alibaba-inc.com
 */
module.exports = (Service) => {
    let TenMins = 10 * 60 * 1000;
    Service.add([{
        name: 'list',
        url: './tmpl/apis/list.json',
        cache: TenMins
    }, {
        name: 'list1',
        url: './tmpl/apis/list1.json'
    }, {
        name: 'list404',
        url: './tmpl/apis/list404.json'
    }, {
        name: 'code',
        url: './tmpl/apis/code.json',
        cache: TenMins
    }]);
};