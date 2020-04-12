var initMap = true;
window.onload = ()=>{
	let nav_tabs = document.getElementById('nav_tabs')
	var list = {'nav_operator':'operator_container','nav_device_connect':'main'}
	nav_tabs.onclick = (ev)=>{
		let id = ev.target.id
		let panelId = list[id]
		let navs = document.getElementsByClassName('tabs')
		for(let i=0;i<navs.length;i++){
			if(navs[i].id==id){
				navs[i].className ='active tabs'
				document.getElementById(list[navs[i].id]).style.display='block'
				
			}
			else{
				navs[i].className ='tabs'
				document.getElementById(list[navs[i].id]).style.display='none'
			}
		}
		if(id=='nav_device_connect'){
			document.getElementById('ispcInf').style.display='block'
			document.getElementById('operatorInf').style.display='none'
			if(initMap){
				ispc_coord();
    			connect();
				initMap = false;
			}
			// document.getElementById('operator_container').style.display='none'
		}
		else{
			document.getElementById('ispcInf').style.display='none'
			document.getElementById('operatorInf').style.display='block'
			// document.getElementById('operator_container').style.display='block'
		}
	}
}
// function switch_nav(e){
// 	let id = e.target.id
// 	var list = {'nav_operator':'operator','nav_device_connect':'main'}
// 	let panelId = list[id]
// 	let navs = document.getElementsByClassName('nav nav-tabs')
// 	for(let i=0;i<navs.length;i++){
// 		if(navs[i].id==id){
// 			navs[i].class='active'
// 			document.getElementById(list[navs[i].id]).style.display='block'
// 		}
// 		else{
// 			navs[i].class=''
// 			document.getElementById(list[navs[i].id]).style.display='none'
// 		}
// 	}
// }