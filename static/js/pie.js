function pie(L_labels,L_data,r_label,r_data){
//   option = {
//     tooltip: {
//         trigger: 'item',
//         formatter: "{a} <br/>{b}: {c} ({d}%)"
//     },
//     graphic:{
//         type:'text',
//         left:'center',
//         top:'center',
//         style:{
//             text:'100',
//             textAlign:'center',
//             fill:'#000',
//             width:30,
//             height:30
//         }
//     },
//     series: [
//         {
//             name,
//             type:'pie',
//             radius: ['40%', '55%'],
//             label: {
//                 normal: {
//                     formatter: '{b}：{c}({d}%)',
//                     // backgroundColor: '#eee',
//                 }
//             },
//             data
//         }
//     ]
// };
// option = {
//     tooltip: {
//         trigger: 'item',
//         formatter: "{a} <br/>{b}: {c} ({d}%)"
//     },
//     legend: {
//         // orient: 'vertical',
//         x: 'left',
//         data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//     },
//     series: [
//         {
//             name:'访问来源',
//             type:'pie',
//             radius: ['50%', '70%'],
//             avoidLabelOverlap: false,
//             label: {
//                 normal: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     show: true,
//                     textStyle: {
//                         fontSize: '30',
//                         fontWeight: 'bold'
//                     }
//                 }
//             },
//             labelLine: {
//                 normal: {
//                     show: false
//                 }
//             },
//             data:[
//                 {value:335, name:'直接访问'},
//                 {value:310, name:'邮件营销'},
//                 {value:234, name:'联盟广告'},
//                 {value:135, name:'视频广告'},
//                 {value:1548, name:'搜索引擎'}
//             ]
//         }
//     ]
// };

option = {
    title: {
        text: '基础雷达图',
        left: 'center',
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: 'black',
           }
        },
        indicator: r_label
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : r_data
    }]
};
Pchart.setOption(option)

option = {
    title: {
        text: '出口国 TOP5',
        left: 'center',
    },
    yAxis: {
        type: 'category',
        axisLabel: {show: false},
        data: L_labels//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    xAxis: {
        type: 'value'
    },
    series: [{
        data: L_data,//[120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '60%',
        itemStyle:{
            normal:{
                color:'#ccc'
            }
        },
        label: {
            normal: {
                show: true,
                formatter: '{b}',
                color:'black',
            }
        },
    }]
};
Lchart.setOption(option)
}