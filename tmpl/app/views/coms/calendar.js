/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Datepicker = require('@coms/calendar/datepicker');
var Rangepicker = require('@coms/calendar/rangepicker');
module.exports = Magix.View.extend({
    tmpl: '@calendar.html',
    tmplData: '@calendar.html:data',
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id,
            min: '2015-02-12',
            max: '2030-08-09',
            selected: '2016/7/21'
        }).digest();
    },
    'showCal<click>': function(e) {
        //console.log(e);
        var ipt = e.current;
        Datepicker.show(this, {
            ownerNodeId: ipt.id || (ipt.id = Magix.guid('cal_')),
            dock: e.params.dock,
            selected: ipt.value,
            picked: function(e) {
                console.log(e);
                ipt.value = e.date;
            }
        });
    },
    'showCal1<click>': function(e) {
        e.preventDefault();
        var ipt = e.current;
        Datepicker.show(this, {
            ownerNodeId: ipt.id || (ipt.id = Magix.guid('cal_')),
            dock: e.params.dock,
            selected: ipt.innerHTML,
            picked: function(e) {
                ipt.innerHTML = e.date;
            }
        });
    },
    'showRangeCal<click>': function(e) {
        e.preventDefault();
        var ipt = e.current;
        var dates = ipt.value.split('~');
        var quickDateKeys = [
            'today',
            'yesterday',
            'lastestThisMonth',
            'lastest7',
            'lastest15',
            'lastest30',
            'preMonth',
            'passedThisMonth',
            'passed30'
        ];
        dates = Rangepicker.getRangeDescription(dates[0], dates[1], quickDateKeys);
        Rangepicker.show(this, {
            ownerNodeId: ipt.id || (ipt.id = Magix.guid('rng_')),
            dock: e.params.dock,
            dates: dates,
            quickDates: quickDateKeys,
            picked: function(e) {
                ipt.value = e.startStr + '~' + e.endStr;
            }
        });
    }
});