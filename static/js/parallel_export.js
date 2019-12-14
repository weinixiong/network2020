function paral() {
    // Schema:
    // 各类商品的import/export值
    var chart = echarts.init(document.getElementById('parallel'));
    var chart2 = echarts.init(document.getElementById('barchart'));


    var dataBalance = Object.values(balance).reverse();
    var countryList = Object.keys(balance).reverse();

    var itemStyle = {
        normal: {
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };

    //商品种类
    var schema = [
        { name: 'Country', index: 0, text: 'Country' },
        { name: 'Food', index: 1, text: 'Food' },
        { name: 'Fuels', index: 2, text: 'Fuels' },
        { name: 'Iron', index: 3, text: 'Iron and steel' },
        { name: 'Chemicals', index: 4, text: 'Chemicals' },
        { name: 'Machinery', index: 5, text: ' Machinery and transport equipment' },
        { name: 'Textiles', index: 6, text: 'Textiles' },
        { name: 'Clothing', index: 7, text: 'Clothing' },
    ]

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.6
        }
    };

    option = {
        backgroundColor: 'gray',

        legend: {
            bottom: 30,
            data: ['import', 'export'],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: "item",
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                var value = obj[0].value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + obj[0].seriesName + ' ' + value[0] + 'Total Value：'
                    + value[7]
                    + '</div>'
                    + schema[1].text + '：' + value[1] + '<br>'
                    + schema[2].text + '：' + value[2] + '<br>'
                    + schema[3].text + '：' + value[3] + '<br>'
                    + schema[4].text + '：' + value[4] + '<br>'
                    + schema[5].text + '：' + value[5] + '<br>'
                    + schema[6].text + '：' + value[6] + '<br>';
            }
        },
        toolbox: {

        },
        // dataZoom: {
        //     show: true,
        //     orient: 'vertical',
        //     parallelAxisIndex: [0]
        // },
        parallelAxis: [
            {
                dim: 0, name: schema[0].text, type: 'category', data: dataIm.map((item, index) => { return item[0] }),
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            { dim: 1, name: schema[1].text },
            { dim: 2, name: schema[2].text },
            { dim: 3, name: schema[3].text },
            { dim: 4, name: schema[4].text },
            { dim: 5, name: schema[5].text },
            { dim: 6, name: schema[6].text },
            { dim: 7, name: schema[7].text },
        ],
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 150,
        //     dimension: 2,
        //     inRange: {
        //         color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
        //         // colorAlpha: [0, 1]
        //     }
        // },
        parallel: {
            left: '5%',
            right: '18%',
            // bottom: 100,
            parallelAxisDefault: {
                type: 'value',
                name: 'AQI指数',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        series: [
            {
                name: 'export',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: false,
                data: dataIm
            },
            {
                name: 'import',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: false,
                data: dataEx
            },
        ]
    };

    chart.setOption(option);

    option2 = {
        tooltip: {
            trigger: "axis",
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
                var name = params[0].name
                //图表title名称
                var seriesName = params[0].seriesName
                //值
                var value = params[0].value
                var valueFliter = (value).toFixed(2) + '%'
                return name + '<br />' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>' + seriesName + " : " + valueFliter
            }
        },
        brush: {
            toolbox: ['rect', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        },
        grid: {
            top: 80,
            bottom: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: { lineStyle: { type: 'dashed' } },
            axisLabel: {
                formatter: (val) => {
                    return val + "%";
                }
            }

        },
        yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: countryList
        },
        series: [
            {
                name: 'balance of GDP',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        formatter: '{b}'
                    }
                },
                data: dataBalance,
            }
        ]
    };
    chart2.setOption(option2);

    chart2.on('brushSelected', renderBrushed);

}
function renderBrushed(params) {
    var brushComponent = params.batch[0];
    //这里总共就一个series,貌似不用循环也行，以防万一
    for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var brushed = brushComponent.selected[sIdx].dataIndex;
        console.log(brushed)//选中的国家的index列表（balance列表里面的国家）
    }
}

// $(document).ready(function () {
    //chosen初始化
    // selcet_ini("#customerId1", ContinentList);
    // //多选select 数据同步
    // chose_get_ini("#customerId1");
    // $("#customerId1").change(function () {
    //     console.log(chose_get_value("#customerId1"));
    // });
// });

// var config = {
//     '.chosen-select': {},
//     '.chosen-select-deselect': { allow_single_deselect: true },
//     '.chosen-select-no-single': { disable_search_threshold: 10 },
//     '.chosen-select-no-results': { no_results_text: 'Oops, no such country!' },
//     '.chosen-select-width': { width: "95%" }
// }

// //初始化多选框
// function selcet_ini(select, data) {
//     const clist = Object.keys(data)
//     //添加选项
//     for (let c of clist) {
//         $(select).append("<option>" + c.toString() + "</option>")
//     }
//     //添加属性值
//     for (let selector in config) {
//         $(select).chosen(config[selector]);
//     }
// }

// //select 数据同步
// function chose_get_ini(select) {
//     $(select).chosen().change(function () { $(select).trigger("liszt:updated"); });
// }

// //select value列表获取
// function chose_get_value(select) {
//     return $(select).val();
// }

// //select text获取，多选时请注意
// function chose_get_text(select) {
//     return $(select + " option:selected").text();
// }

