/*
    author:xinglie.lkf@alibaba-inc.com
 */
let $ = require('$');
let Magix = require('magix');
module.exports = {
    renderECharts(node, options) {
        node = $(node);
        let chart = window.echarts.init(node[0]);
        chart.setOption(options);
        this.capture(Magix.guid('chart'), {
            destroy() {
                chart.dispose();
            }
        }, true);
        return chart;
    }
};