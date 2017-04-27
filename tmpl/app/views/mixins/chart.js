/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let ECharts = require('@app/mixins/echarts');
module.exports = Magix.View.extend({
    tmpl: '@chart.html',
    mixins: [ECharts],
    render() {
        let me = this;
        //以下是动态加载，项目中通常直接引入
        $.getScript('https://cdn.bootcss.com/echarts/3.5.3/echarts.common.js', () => {
            me.updater.digest();

            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            me.renderECharts('#chart', option);
        });
    }
});