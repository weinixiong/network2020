var selected = [];

function paral() {
    // Schema:
    var chartParal = echarts.init(document.getElementById('parallel'));

    // 各类商品的import/export值
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

    var optionParal = {
        brush: { brushLink: "all", toolbox: ['rect', 'keep', 'clear'] },
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
                },
                parallelIndex:0
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
                data: dataIm,
                hoverAnimation: true,
            },
            {
                name: 'import',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: false,
                data: dataEx,
                hoverAnimation: true,
            },
        ]
    };

    chartParal.setOption(optionParal);
    chartParal.on('axisareaselected', function () {
        var series0 = chartParal.getModel().getSeries()[0];
        var series1 = chartParal.getModel().getSeries()[1];
        var indices0 = series0.getRawIndicesByActiveState('active');
        var indices1 = series1.getRawIndicesByActiveState('active');
        console.log(indices0, indices1);
    });
}

function barchart() {
    var chartBar = echarts.init(document.getElementById('barchart'))
    var dataBalance = Object.values(balance).reverse();
    var countryList = Object.keys(balance).reverse();

    var optionBar = {
        title: {
            text: '进出口差值与GDP比值'
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            title: {
                text: "Balance",
                show: true
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
            toolbox: ['rect', 'keep', 'clear'],
            xAxisIndex: 0
        },
        grid: {
            top: 80,
            bottom: 30
        },
        yAxis: {
            type: 'value',
            position: 'top',
            splitLine: { lineStyle: { type: 'dashed' } },
            axisLabel: {
                formatter: (val) => {
                    return val + "%";
                }
            }

        },
        xAxis: {
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
                hoverAnimation: true,
            }
        ]
    };
    chartBar.setOption(optionBar);
    chartBar.on('brushSelected', renderBrushedBar);
}

function renderBrushedBar(params) {
    var brushComponent = params.batch[0];
    //这里总共就一个series,貌似不用循环也行，以防万一
    for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var brushed = brushComponent.selected[sIdx].dataIndex;
        // console.log(brushed)//选中的国家的index列表（balance列表里面的国家）
    }
}

//初始化多选框
function selcet_ini(select, data) {
    //添加选项
    for (let c of data) {
        $(select).append('<option>' + c.toString() + "</option>")
    }
}

//select value列表获取
function chose_get_value(select) {
    alert($("li .selected").value);
    return $(select).val();
}

//select text获取，多选时请注意
function chose_get_text(select) {
    return $(select + " option:selected").text();
}

//多选select 数据初始化
selcet_ini("#countries", COUNTRY);

$('#countries').multipleSelect({
    addTitle: true, //鼠标点悬停在下拉框时是否显示被选中的值
    selectAll: true, //是否显示全部复选框，默认显示
    name: "国家",
    selectAllText: "选择全部", //选择全部的复选框的text值
    allSelected: "全部", //全部选中后显示的值
    delimiter: ', ', //多个值直接的间隔符，默认是逗号
    placeholder: "选择一个国家", //不选择时下拉框显示的内容
    keepOpen: true,
    animate: "slide",
    filter: true,
    maxHeightUnit: 'row',
    maxHeight: 18,
    isOpen: true
});

//两个列表的差集
function diff(lt1, lt2) {
    var diff = lt1.length > lt2.length ? lt1.filter(function (i) { return lt2.indexOf(i) < 0; })
        : lt2.filter(function (i) { return lt1.indexOf(i) < 0; });
    return diff
}

$(function () {
    var mysel = $("#countries");
    mysel.change(function () {
        var newvalue = mysel.val(); //当前选中值
        let chart0 = echarts.getInstanceByDom(document.getElementById('barchart'))
        let chart1 = echarts.getInstanceByDom(document.getElementById('parallel'))
        console.log("on change")

        var clicked = diff(newvalue, selected)[0];

        clickCountry(clicked)
        //update select
        if (selected.indexOf(clicked) < 0) {
            selected.push(clicked)
        }
        else {
            selected.splice(selected.indexOf(clicked), 1)
        }

        console.log(selected)

        chart0.dispatchAction({
            type: 'brush',
            areas: [ // areas 表示选框的集合，可以指定多个选框。
                { // 选框一：
                    xAxisIndex: 0, // 指定此选框属于 index 为 0 的 geo 坐标系。
                    // 也可以通过 xAxisIndex 或 yAxisIndex 来指定此选框属于直角坐标系。
                    // 如果没有指定，则此选框属于『全局选框』。不属于任何坐标系。
                    // 属于『坐标系选框』，可以随坐标系一起缩放平移。属于全局的选框不行。
                    brushType: 'lineX', // 指定选框的类型。还可以为 'rect', 'lineX', 'lineY'
                    // range: [ // 如果是『全局选框』，则使用 range 来描述选框的范围。
                    //     0,1
                    // ],
                    coordRange: [ // 如果是『坐标系选框』，则使用 coordRange 来指定选框的范围。
                        COUNTRY.length - 1 - COUNTRY.indexOf(selected[selected.length - 1])
                        // 这个例子中，因为指定了 geoIndex，所以 coordRange 里单位是经纬度。
                    ]
                },
            ]
        });
        chart0.dispatchAction({
            type: 'showTip',
            // // 可选，系列 index，可以是一个数组指定多个系列
            seriesIndex: 0,
            // // 可选，系列名称，可以是一个数组指定多个系列
            // seriesName?: string|Array,
            // // 可选，数据的 index
            dataIndex: COUNTRY.length - 1 - COUNTRY.indexOf(selected[selected.length - 1]),
            // // 可选，数据的 名称
            // name: "import"
        })

        // chart1.dispatchAction({
        //     type: 'brush',
        //     areas: [ // areas 表示选框的集合，可以指定多个选框。
        //         { // 选框一：
        //             parallelIndex: 0, // 指定此选框属于 index 为 0 的 geo 坐标系。
        //             // 也可以通过 xAxisIndex 或 yAxisIndex 来指定此选框属于直角坐标系。
        //             // 如果没有指定，则此选框属于『全局选框』。不属于任何坐标系。
        //             // 属于『坐标系选框』，可以随坐标系一起缩放平移。属于全局的选框不行。
        //             brushType: 'lineY', // 指定选框的类型。还可以为 'rect', 'lineX', 'lineY'
        //             range: [ // 如果是『全局选框』，则使用 range 来描述选框的范围。
        //                 COUNTRY.length - 1 - COUNTRY.indexOf(selected[selected.length - 1])
        //             ],
        //             // coordRange: [ // 如果是『坐标系选框』，则使用 coordRange 来指定选框的范围。
        //             //     COUNTRY.length-1-COUNTRY.indexOf(newvalue[newvalue.length-1])
        //             //     // 这个例子中，因为指定了 geoIndex，所以 coordRange 里单位是经纬度。
        //             // ]
        //         },
        //     ]
        // })
    });
});
