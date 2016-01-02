//版权 北京智能社©, 保留所有权利
function jsonp(options){
	
	//整理options
	options=options||{};
	options.url=options.url||alert('error');
	options.data=options.data||{};
	options.success=options.success||null;
	options.error=options.error||null;
	options.cbKey=options.cbKey||'cb';
	options.timeout=options.timeout||0;
	
	//var cbKey='cb';	//回调的键(cb)不固定,需要传入
	//随机函数名
	var cbValue='jsonp'+Math.random();
	options.data[options.cbKey]=cbValue.replace('.','');//删除函数名子里面的点
	//定义外面的本地函数
	window[options.data[options.cbKey]]=function(json){
		options.success&&options.success(json)
		document.head.removeChild(oScript);//删除head的script标签
		window[options.data[options.cbKey]]=null;
		clearInterval(timer);//清除超时
	};
	
	//整理url
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	options.url=options.url+'?'+arr.join('&');
	
	//创建script标签，丢到head里
	var oScript=document.createElement('script');
	oScript.src=options.url;
	document.head.appendChild(oScript);	//head只有一个，可以直接用
	
	//计时
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error&&options.error();
			window[options.data[options.cbKey]]=function(){/*啥也不干*/};
			document.head.removeChild(oScript);//删除head的script标签
		},options.timeout);	
	}
}