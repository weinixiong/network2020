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
        { name: 'Country', index: 0, text: '国家' },
        { name: 'Food', index: 1, text: '食品' },
        { name: 'Fuels', index: 2, text: '燃料' },
        { name: 'Iron', index: 3, text: '铁' },
        { name: 'Chemicals', index: 4, text: '化学制品' },
        { name: 'Machinery', index: 5, text: '机械' },
        { name: 'Textiles', index: 6, text: '纺织品' },
        { name: 'Clothing', index: 7, text: '服装' },
    ]

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.6
        }
    };

    var optionParal = {
        title: {
            text: '产品进/出口量'
        },
        // brush: { brushLink: "all", toolbox: ['rect', 'keep', 'clear'] },
        color:["#cc5552","#25adf4"],
        backgroundColor: '#FFF',
        legend: {
            bottom: 30,
            data: ['import', 'export'],
            itemGap: 20,
            textStyle: {
                color: 'gray',
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
                // name: 'AQI指数',
                // nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: 'black',
                    fontSize: 12,
                },
                axisLine: {
                    // show:false,
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    show:false,
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            }
        },
        series: [
            {
                name: 'export',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: false,
                data: dataIm.reverse(),
                hoverAnimation: true,
            },
            {
                name: 'import',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: false,
                data: dataEx.reverse(),
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
    var dataBalance = Object.values(balance);

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
            data: COUNTRY
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
                itemStyle: {
                    color: function(p) {
                        // console.log(p)
                        return p.data > 0 ? '#cc5552' : '#6bb18c';
                    }
                }
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