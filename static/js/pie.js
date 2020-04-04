function pie(country,L_labels,L_data,r_label,r_data){
    document.getElementById('countryName').innerHTML = country
    option = {
        title: {
            text: '城市间通信数目分布'
        },
        tooltip: {
            trigger: 'axis'
        },
        // itemStyle: {
        //         color: 'rgb(97,160,168)'
        //     },
        radar: [
            {
                indicator: [
                   {text: '上海', max: 800},
                    {text: '乌鲁木齐', max: 800},
                    {text: '北京', max: 800},
                    {text: '广州', max: 800},
                    {text: '哈尔滨', max: 800},
                    {text: '香港', max: 800},
                    
                ],
                radius: 80
            }
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                areaStyle: {},
                data: [
                    {
                        value: [600,100, 730, 500, 400,700],
                        name: '某软件'
                    }
                ]
            }
        ]
};
    Pchart.setOption(option)

    option = {
        title: {
            text: '通信频率 TOP5',
            left: 'left',
        },
        yAxis: {
            type: 'category',
            axisLabel: {show: false},
            data: L_labels,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            reverse:true
        },
        xAxis: {
            type: 'value',
            axisLabel:{
                show:false
            },
            splitLine:{show:false},
            position:'top'
        },
        series: [{
            data: L_data,//[120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '60%',
            itemStyle:{
                normal:{
                    color:'#cc5552'
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{b}({c} 万)',
                    color:'black',
                    position:"insideLeft"
                }
            },
        }]
    };
    Lchart.setOption(option)
    option = {
        title: {
            text: '运营商ISPC占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        itemStyle: {
                    color: '#c23531'
                },
        visualMap: {
            show: false,
            min: 0,
            max: 30,
            inRange: {
                colorLightness: [0.2,0.5]
            }
        },
        series: [
            {
                name: '运营商',
                type: 'pie',
                radius: '55%',
                // center: ['40%', '50%'],
                data: [
                {value: 30, name: '中国联通'},
                {value: 29, name: '中国电信'},
                {value: 16, name: '中国移动'},
                {value:2,name:'MCN'}
            ].sort(function (a, b) { return a.value - b.value; }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                 labelLine: {
                    lineStyle: {
                        color: 'gray'
                    },
                    smooth: 0.2,
                    length: 5,
                    length2: 10
                },
            }
        ]
};
//     option = {
//         backgroundColor: 'white',

//         title: {
//             text: 'Customized Pie',
//             left: 'center',
//             top: 20,
//             textStyle: {
//                 color: '#000'
//             }
//         },

//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b} : {c} ({d}%)'
//         },

//         visualMap: {
//             show: false,
//             min: 0,
//             max: 60,
//             inRange: {
//                 colorLightness: [0, 1]
//             }
//         },
//         series: [
//             {
//                 name: '访问来源',
//                 type: 'pie',
//                 radius: '55%',
//                 center: ['50%', '50%'],
//                 data: [
//                     {value: 30, name: '中国联通'},
//                     {value: 29, name: '中国电信'},
//                     {value: 16, name: '中国移动'},
//                     {value:2,name:'北京船舶通信导航公司'}
//                 ].sort(function (a, b) { return a.value - b.value; }),
//                 roseType: 'radius',
//                 label: {
//                     color: 'gray'
//                 },
//                 labelLine: {
//                     lineStyle: {
//                         color: 'gray'
//                     },
//                     smooth: 0.2,
//                     length: 10,
//                     length2: 20
//                 },
//                 itemStyle: {
//                     color: '#c23531'
//                 },

//                 animationType: 'scale',
//                 animationEasing: 'elasticOut',
//                 animationDelay: function (idx) {
//                     return Math.random() * 200;
//                 }
//             }
//         ]
// };
    operatorchart.setOption(option)
}