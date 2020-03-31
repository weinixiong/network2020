//初始化多选框
function selcet_ini(select, data) {
    //添加选项
    // for (let c of data) {
    //     $(select).append('<option>' + c.toString() + "</option>")
    // }
    for (let c in data) {
        $(select).append('<optgroup label='+c.toString()+' id='+c.toString()+'></optgroup>')
        for(let operator of data[c]){
            $('#'+c).append('<option value='+c.toString()+'-'+operator.toString()+'>' + operator.toString() + "</option>")
        }
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
selcet_ini("#countries", MOCK);

$('#countries').multipleSelect({
    addTitle: true, //鼠标点悬停在下拉框时是否显示被选中的值
    selectAll: false, //是否显示全部复选框，默认显示
    name: "国家",
    delimiter: ', ', //多个值直接的间隔符，默认是逗号
    placeholder: "选择一个运营商", //不选择时下拉框显示的内容
    keepOpen: true,
    animate: "slide",
    filter: true,
    maxHeightUnit: 'row',
    maxHeight: 24,
    isOpen: true
});

//两个列表的差集
function diff(lt1, lt2) {
    var diff = lt1.length > lt2.length ? lt1.filter(function (i) { return lt2.indexOf(i) < 0; })
        : lt2.filter(function (i) { return lt1.indexOf(i) < 0; });
    return diff
}

// mysel.multipleSelect('check'/'uncheck', "China-联通")//选中或者取消选中
// 选中后可得到选中的value为'国家名-运营商名'
$(function () {
    var mysel = $("#countries");
    mysel.change(function () {
        var newvalue = mysel.val(); //当前选中值列表
        let chart0 = echarts.getInstanceByDom(document.getElementById('barchart'))
        console.log("on change")

        var clicked = diff(newvalue, selected);

        for(let c of clicked){
            // clickCountry(c)联动选运营商
            //update select
            if (selected.indexOf(c) < 0) {
                selected.push(c)
            }
            else {
                selected.splice(selected.indexOf(c), 1)
            }
        }
        console.log(selected,clicked)
        // renderLchart(selected[selected.length-1])
    });
});