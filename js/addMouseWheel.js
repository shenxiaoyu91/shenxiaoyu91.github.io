//版权 北京智能社©, 保留所有权利
function addMouseWheel(obj,fn){
	
	//绑定事件 —— 判断浏览器
	if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		obj.addEventListener("DOMMouseScroll",fnWheel,false);
	} else {
		obj.onmousewheel = fnWheel;
	}
		
		
	function fnWheel(ev){
		var oEvent = ev || event;
		//判断方法  ff 下 true
		
		var bDown = true;
		
		if(oEvent.wheelDelta){// ie chrome
			bDown = oEvent.wheelDelta > 0? false : true;
		} else {//ff 
			bDown = oEvent.detail > 0? true : false;
		}
		
		(typeof fn == "function") && fn(bDown);
		
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	
}