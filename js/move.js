//版权 北京智能社©, 保留所有权利

function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,null))[name];
}

//options type-easing time-duration fnEnd-complete
function move(obj,json,options){
	
	options = options || {};
	options.easing = options.easing || "ease-out";
	options.duration = options.duration || 700;
	
	
	
	//起点
	var start = {};
	//距离
	var dis = {};
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	//终点json
	//次数
	var count = Math.round(options.duration/30);
	
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		//位置
		
		for(var name in json){
			
			switch(options.easing){
				case "linear":
					var a = n/count;
					var cur = start[name] + dis[name]*a;
					break;
				case "ease-in":
					var a = n/count;
					var cur = start[name] + dis[name]*Math.pow(a,3);
					break;
				case "ease-out":
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	},30);
	
}










