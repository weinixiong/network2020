let baseURL = 'http://localhost:3000/';

function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = function () {
            if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                resolve(this.responseText);
            }
        };
        xhr.onerror = reject;
        xhr.open('GET', baseURL + url);
        xhr.send();
    });
}

// 请求数据
// let GRAPH, MCC_MNC,l_label,l_data,r_label,r_data,ispc_coord_data,connect_data,country_coord_data
ajax("")
    .then(function (result) {
        // { GRAPH, MCC_MNC, l_label, l_data, r_label, r_data, ispc_coord_data, connect_data, country_coord_data } = result
    })
    .catch(function (err) { throw new Error(err) });