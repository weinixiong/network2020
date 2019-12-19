var BubbleChart = null;
// myChart.showLoading();
/**
 * data:{
 * timeline:['1980',],
 * counties:[],
 * series:[
    [
        [x,y,大小，名称，年份]
    ]
 * 
 * ]
 * }
 * series:每年的每个国家的经济数据
 */
// $.get(ROOT_PATH + 'data/asset/data/life-expectancy.json', function (data) {
    // myChart.hideLoading();
function GDPBubbleChart(){
    if(BubbleChart == null){
        BubbleChart = echarts.init(document.getElementById('BubbleChart'))
    }
    var itemStyle = {
        normal: {
            color:'black'
            // opacity: 0.8,
            // shadowBlur: 10,
            // shadowOffsetX: 0,
            // shadowOffsetY: 0,
            // shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    var sizeFunction = function (x) {
        var y = Math.sqrt(x / GDPList.PopulationInf.max) + 0.1;
        return y * 80;
    };
    var colorFunction = function (x) {
        continent = {
            'Europe':'#bda29a',
            'Asia':'#e88f70',
            'Africa':'#7b7c68',
            'Americas':'#9dc5c8',
            'Oceania':'#f0b489'
        }
        // ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
        var y = continent[ContinentList[x]]
        return y;
    };
    colors = []
    for (let c of GDPList.countries){
        colors.push(colorFunction(c))
    }
    // Schema:1，0，2人均GDP,GINI系数，人口，国家，年份
    var schema = [
        {name: 'Income', index: 1, text: '人均收入', unit: '美元'},
        {name: 'GINI', index: 0, text: '基尼系数', unit: ''},
        {name: 'Population', index: 2, text: '总人口', unit: '万'},
        {name: 'Country', index: 3, text: '国家', unit: ''}
    ];

    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 1000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: 'black'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data: []
            },
            backgroundColor:'rgba(255, 255, 255, 0)',
            title: [{
                text: GDPList.timeline[0],
                textAlign: 'top',
                left: '60%',
                top: '20%',
                textStyle: {
                    fontSize: 100,
                    color: '#ccc'
                }
            }, {
                text: '各国人均GDP、人口、基尼指数随时间的演变',
                left: 'center',
                top: 10,
                textStyle: {
                    color: 'black',
                    fontWeight: 'normal',
                    fontSize: 20
                }
            }],
            tooltip: {
                padding: 5,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2]/10000+ schema[2].unit + '<br>';
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            xAxis: {
                type: 'log',
                name: '人均收入',
                max: GDPList.GDPInf.max,
                min: GDPList.GDPInf.min,
                nameGap: 25,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                axisLabel: {
                    formatter: '{value}美元',
                    color:'black'
                }
            },
            yAxis: {
                type: 'value',
                name: '基尼系数',
                max: GDPList.giniInf.max,
                min:GDPList.giniInf.min,
                nameTextStyle: {
                    color: 'black',
                    fontSize: 18
                },
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}',
                    color:'black'
                }
            },
            visualMap: [
                {
                    show: false,
                    dimension: 3,
                    categories: GDPList.countries,
                    calculable: true,
                    precision: 0.1,
                    textGap: 30,
                    textStyle: {
                        color: 'black'
                    },
                    inRange: {
                        // color:function(val){
                        //     console.log(val)
                        //     return colorFunction(val)
                        // }
                        color: colors
                    }
                }
            ],
            series: [
                {
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: GDPList.series[0],
                    symbolSize: function(val) {
                        return sizeFunction(val[2]);
                    },
                }
            ],
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };

    for (var n = 0; n < GDPList.timeline.length; n++) {
        option.baseOption.timeline.data.push(GDPList.timeline[n]);
        option.options.push({
            title: {
                show: true,
                'text': GDPList.timeline[n] + ''
            },
            series: {
                name: GDPList.timeline[n],
                type: 'scatter',
                itemStyle: itemStyle,
                data: GDPList.series[n],
                symbolSize: function(val) {
                    return sizeFunction(val[2]);
                }
            }
        });
    }

    BubbleChart.setOption(option);
}
// });