//版权 北京智能社©, 保留所有权利

//options url data timeout success error cbName
function jsonp(options){
	
	options = options || {};
	if(!options.url){
		return ;
	}
	
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	options.cbName = options.cbName || "cb";
	
	var fnName = ("jsonp_" +  Math.random()).replace(".","");
	
	//拼数据
	var arr = [];
	options.data[options.cbName] = fnName;
	for(var i in options.data){
		arr.push(i + "=" + options.data[i]);
	}
	var str = arr.join("&");
	
	//准备全局函数
	window[fnName] = function(json){
		
		options.success && options.success(json);
		//释放资源
		//定时器 删除标签 清理函数
		window[fnName] = null;
		clearTimeout(timer);
		oHead.removeChild(oS);
	};
	
	
	//1创建script
	var oS = document.createElement("script");
	oS.src = options.url + "?" + str;
	var oHead = document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	//超时
	if(options.timeout){
		var timer = setTimeout(function(){
			options.error && options.error();
			//释放资源
			//定时器 删除标签 清理函数
			window[fnName] = function(){};
			clearTimeout(timer);
			oHead.removeChild(oS);	
		},options.timeout);
	}
	
	
}