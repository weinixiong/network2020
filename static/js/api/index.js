let baseURL = 'http://localhost:3000/';

function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', baseURL + url);
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onerror = reject;
        xhr.send();
        xhr.onreadystatechange  = function () {
            if (xhr.readyState === 4 &&(this.status >= 200 && this.status < 300) || this.status == 304) {
                resolve(this.responseText);
            }
        };
    });
}

// 请求数据
let GRAPH, MCC_MNC,l_label,l_data,r_label,r_data,ispc_coord_data,connect_data,country_coord_data
ajax("")
    .then(function (result) {
        result = JSON.parse(result)
        GRAPH = result.GRAPH
        MCC_MNC = result.MCC_MNC
        l_label = result.l_label
        l_data = result.l_data
        r_label = result.r_label
        r_data = result.r_data
        ispc_coord_data = result.ispc_coord_data
        connect_data = result.connect_data
        country_coord_data = result.country_coord_data 
    })
    .catch(function (err) { throw new Error(err) });