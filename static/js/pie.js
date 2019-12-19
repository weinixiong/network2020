function pie(country,L_labels,L_data,r_label,r_data){
document.getElementById('countryName').innerHTML = country
option = {
    title: {
        text: '出口商品',
        left: 'left',
        top:'top'
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: 'black',
                
           },
           position:'right'
           
        },
        indicator: r_label,
    },
    series: [{
        name: '',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : r_data
    }]
};
Pchart.setOption(option)

option = {
    title: {
        text: '出口国 TOP5',
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
                color:'#ccc'
            }
        },
        label: {
            normal: {
                show: true,
                formatter: '{b}({c} 亿)',
                color:'black',
                position:"insideLeft"
            }
        },
    }]
};
Lchart.setOption(option)
}