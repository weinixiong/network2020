var dom = document.getElementById("operator_container");
var myChart = echarts.init(dom);
var app = {};
option = null;
myChart.showLoading();
$.get('./Asia_Pacific_Network_0402_1.json', function (webkitDep) {
    myChart.hideLoading();

    option = {
        legend: {
            data: ['Non Operator', 'Operator']
        },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                position: 'right',
                formatter: '{b}'
            },
            draggable: true,
            data: webkitDep.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
            }),
            categories: webkitDep.categories,
            force: {
                edgeLength: 15,
                repulsion: 40,
                gravity: 0.2
            },
            roam: true,
            edges: webkitDep.links
        }]
    };

    myChart.setOption(option);
});;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}