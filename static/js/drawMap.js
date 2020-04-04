// 基于准备好的dom，初始化echarts实例
var Mapchart = echarts.init(document.getElementById('main'));
var stardSize = 50
//24个省市经度纬度
var countryInf = {}//{countryName:{value:'',data:''}},
    maxV = 0,//全局的最大最小值
    minV = 0,
    // Clicked = fasle;//用于确定是否增加国家的点
    ClickedList = {}//是否已点击
var ISPCList = {}
//根据起始终点名称确定经纬度坐标
var convertData1 = function (fName,data) {
    let d1 = [],
        values = {}
    for (let toNode of data) {
        let fromCoord = geoCoordMap[fName];
        let toCoord = geoCoordMap[toNode.name];
        if (fromCoord && toCoord) {
            d1.push({
                fromName: fName, 
                toName: toNode.name, 
                coords: [fromCoord, toCoord],
                name:fName+'--'+toNode.name,
                value:toCoord.concat(toNode.value)
            });
            
        }
    }
    return d1;
};
//获取地理名称的经纬度
var convertData2 = function (data) {
    let res = [];
    for (var i in data) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
            // for (var data of item.datas) {
            //     obj.value += data.tradname + "&emsp;价格" + data.price + "&emsp;" + (!isNaN(data.rise) ? (Number(data.rise) == 0 ? '--' : (Number(data.rise) > 0 ? "<span style='color:red'>涨跌" + data.rise + "</span>" : "<span style='color:green'>涨跌" + data.rise + "</span>")) : '--') + '<br/>';
            // }
        }
    }
    return res;
};
/*
绘制飞线，其中result：
{city:'',
 path:[{name: '乌鲁木齐',value:20}],
},...
*/
function Draw(result) {
    // console.log('result',result,geoCoordMap[result.city])
    let fName = result.city,
        path = result.path,
        d2 = convertData2(path),
        d1 = convertData1(fName,path)
    let series = GetSeries(fName,d1,d2)

    return series
};
function GetSeries(fName,d1,d2){
    let series = []
    series.push(
                {
                    name: fName,
                    type: 'scatter',
                    zlevel: 20,
                    color: '#fff',
                    coordinateSystem: 'geo',
                    symbolSize: 1,
                    itemStyle: {
                        normal: {color: '#f00'}
                    },
                    data: d2
                },
                {
                    type: 'lines',
                    zlevel: 15,
                    effect: {
                        show: true, 
                        period: 4, 
                        trailLength: 0, 
                        symbolSize: 1,
                    },
                    lineStyle: {
                        normal: {
                            show: true,
                            width: 0.5, 
                            opacity: 1,
                            curveness: 0.2,
                            color: 'rgba(232,143,112,.5)'
                        }
                    },
                    data: d1
                },
                //出发点
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 15,
                    rippleEffect: {
                        period: 4, brushType: 'stroke', scale: 4
                    },
                    symbol: 'circle',
                    symbolSize: function (val) {
                        return 4 + val[2] / 10;
                    },
                    itemStyle: {
                        normal: {show: false}
                    },
                    tooltip: {
                        show: false,
                    },
                    data: [{
                        name: fName, value: geoCoordMap[fName].concat([100]),
                    }],
                },
                    /*到达点*/
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    rippleEffect: {
                        period: 4, brushType: 'stroke', scale: 2
                    },
                    zlevel: 15,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    tooltip: {
                        show: false,
                    },
                    symbol: 'circle',
                    symbolSize:  function (val) {
                        return 5 + val[3];
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,0,0,0.5)'//157,197,200,1)'
                        }
                    },
                    data: d1.map(function (dataItem) {
                        let size = 0
                        if (maxV==minV)
                            size = stardSize
                        else
                            size = stardSize*(countryInf[dataItem.toName].value-minV)/(maxV-minV)
                        return {
                            name: dataItem.toName,
                            value: dataItem.coords[1].concat([dataItem.toName,size]),
                            tooltip: {
                                formatter: dataItem.fromName + "--" + dataItem.toName + "：" + dataItem.value
                            }
                        };
                    }),
                }
                );
    return series
}
function FreshLim(Name,IsDel){
    maxV = 0
    minV = 0
    if(IsDel)
    {
        let d = countryInf[Name].data.path
        for(let p of d){
            countryInf[p.name].value -= p.value
        }
    }
    else
    {
        ClickedList[Name] = true
        let d = countryInf[Name].data.path
        for(let p of d){
            if(countryInf.hasOwnProperty(p.name))
            {
               countryInf[p.name].value += p.value
            }
            else
            {
                countryInf[p.name] = {value:p.value,data:{}}
            }
        }
    }
    for(let k in countryInf){
        // if(ClickedList[city]){
        let v = countryInf[k].value
        maxV = v > maxV ? v : maxV
        minV = ((v !=0)&&(v < minV || minV==0)) ? v : minV
    }
    
}
Mapchart.on('click', function (params) {
    var ispc = params.name;//默认飞线原点
    freshRightpanel(ISPCList[ispc])
    clickCountry(ispc,false);
});
function freshRightpanel(ispc){
    let rightpanel = document.getElementById('ispcInfList')
    let innerhtml = ''
    let transfor = {
         "ISPC":'国际信令点编码',
        "name": "信令点名称",
        "operator": "所属运营商",
        "city": "所在城市",
        "device": "设备信息",
        "country_ch": "所属国家",
    }
    for(let key in ispc){
        if(transfor.hasOwnProperty(key) && ispc[key]!='')
            innerhtml +=`<li>${transfor[key]}: ${ispc[key]}</li>`
    }
    innerhtml = '<ul>'+innerhtml+"</ul>"
    rightpanel.innerHTML = innerhtml
}
var lastoperator = ''
function clickCountry(city,isoperator = true){
    console.log('clicked',city)
    let lists = {}
    if(isoperator){
        let operator = city.operator
        for(let key in pathList){
            if(operator==pathList[key].operator &&(geoCoordMap.hasOwnProperty(key))){
                clickISPC(key)
            }
        }
        if(lastoperator!=operator){
            lastoperator=operator
            for(let key in ISPCList){
                if(operator==ISPCList[key].operator){
                    lists[key] = ISPCList[key]
                }
            }
        }
       else
        lastoperator = ''
    }
    else{
        clickISPC(city)
    }
    let series = []
    if(Object.keys(lists).length!=0){
        series.concat(getinit_series(lists))
    }
    series = series.concat(getinit_series(lists))
    for(let k in ClickedList){
        if(ClickedList[k]){
            let s = Draw(countryInf[k].data)
            series = series.concat(s)
        }
    }

    if(series.length==0)
        series = [init_series]
    freshMap({series,max:maxV,min:minV})
}
function clickISPC(city){
    if(ClickedList.hasOwnProperty(city) && ClickedList[city])
        {
            ClickedList[city] = false
            //对各个节点的数据的value进行更新
            //删除数据之后对极值进行更新
            FreshLim(city,true)
        }
        else{
            
            //初始化飞线数据
            var path = pathList[city].path
            let data = {city,path,value:100}
            if(countryInf.hasOwnProperty(city))
                countryInf[city]['data'] = data
            else
                countryInf[city] = {data,value:0}
            FreshLim(city,false)
            // let s = Draw(data);
            // let series = chart.getOption().series
            // Freshlabel(series.concat(s));
        }
}
//获取地理名称的经纬度
var getCoord = function (data) {
    let res = [];
    for (var key in data) {
        var geoCoord = data[key].latLng;
        if (geoCoord) {
            res.push({
                name: key,
                value: geoCoord.concat(10),
                inf:data[key]
            });
            // for (var data of item.datas) {
            //     obj.value += data.tradname + "&emsp;价格" + data.price + "&emsp;" + (!isNaN(data.rise) ? (Number(data.rise) == 0 ? '--' : (Number(data.rise) > 0 ? "<span style='color:red'>涨跌" + data.rise + "</span>" : "<span style='color:green'>涨跌" + data.rise + "</span>")) : '--') + '<br/>';
            // }
        }
    }
    return res;
};
var init_series =  null
function initMap(data){
    let series = [],
        min = 1000,
        max = 5000
    ISPCList = data
    init_series = getinit_series(ISPCList)
    // console.log(init_series)
    if(data!=null)
    {
        if(data.hasOwnProperty('series'))
            series = data.series
        if(data.hasOwnProperty('max'))
            max = data.max
        if(data.hasOwnProperty('min'))
            min = data.min
    }
   let option = {
    title: {
        text: '各国进/出口关系'
    },
        backgroundColor:"#E6EDF3",
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name;
            }
        },
        geo: {
            map: 'world',
            layoutCenter: ['50%', '50%'],
            layoutSize: "100%",
            zoom: 1.8,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        // tooltip: {
        //     trigger: 'item',
        //     formatter: function (params) {
        //         if (params.value) {
        //             return params.name + '<br/>' + (params.value[2]/10000).toFixed(0)+'万';
        //         } else {
        //             return params.name;
        //         }
        //     }
        // },
        // geo: {
        //     map: 'world',
        //     zlevel: 10,
        //     layoutCenter: ['50%', '50%'],
        //     roam: true,
        //     layoutSize: "100%",
        //     zoom: 1.8,
        //     label: {
        //         normal: {
        //             show: false,//地图上的省份名称是否显示
        //             textStyle:{
        //                 fontSize:12,
        //                 color: '#43D0D6'
        //             }
        //         },
        //         emphasis: {
        //             show: true
        //         }
        //     },
        //     itemStyle: {
        //         normal: {
        //             color: '#F3F1EB',
        //             borderWidth: 1.1,
        //             // borderColor: '#516a89'
        //         },
        //         emphasis: {
        //             areaColor: 'rgba(51, 69, 89, .5)'
        //         }
        //     }
        // },
        series:[
            init_series
        ]
        };
    
    Mapchart.setOption(option,true)
};
function getinit_series(data){
    return {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: getCoord(data),
                    symbol: 'circle',
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        // emphasis: {
                        //     show: false
                        // }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        normal: {
                            color: 'rgba(255,0,0,0.5)'//157,197,200,1)'
                        }
                    },
                    rippleEffect: {
                            period: 4, brushType: 'stroke', scale: 2
                        }
                }
}
function freshMap(data){
    let series = [],
        min = 1000,
        max = 5000
    if(data!=null)
    {
        if(data.hasOwnProperty('series'))
            series = data.series
        if(data.hasOwnProperty('max'))
            max = data.max
        if(data.hasOwnProperty('min'))
            min = data.min
    }
    let option = Mapchart.getOption()
    option.series=series
    Mapchart.setOption(option,true)
}
function initMapData(countries_coord){
    geoCoordMap = {}
    for(let key in countries_coord){
        geoCoordMap[key] = countries_coord[key].latLng
    }
}