function pie(Pchart,name,data){
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
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '销售（sales）', max: 6500},
           { name: '管理（Administration）', max: 16000},
           { name: '信息技术（Information Techology）', max: 30000},
           { name: '客服（Customer Support）', max: 38000},
           { name: '研发（Development）', max: 52000},
           { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }
        ]
    }]
};
Pchart.setOption(option)
}