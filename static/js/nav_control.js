
// list.forEach(id=>{
// 	let el = document.getElementById(id)
// 	el.onclick = (e)=>{

// 	}
// })
// var el = document.getElementById('device_connect')
// el.onclick = (e)=>{
// 	console.log(e)
// 	el.style.class='active'
// 	document.getElementById('main').style.display = 'block'
// 	document.getElementById('operator').style.display = 'block'
// }
window.onload = ()=>{
	let nav_tabs = document.getElementById('nav_tabs')
	var list = {'nav_operator':'operator','nav_device_connect':'main'}
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