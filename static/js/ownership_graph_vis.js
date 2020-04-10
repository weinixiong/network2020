
var dom = document.getElementById("operator_container");
var operatorChart = echarts.init(dom);
var app = {};
option = null;
operatorChart.showLoading();

function ownership(webkitDep) {
    operatorChart.hideLoading();

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

    operatorChart.setOption(option);
};
if (option && typeof option === "object") {
    operatorChart.setOption(option, true);
}

ownership(GRAPH)