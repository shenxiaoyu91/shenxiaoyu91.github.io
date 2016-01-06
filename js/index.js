
$(function(){
		//标题滚动
		var text=document.title;
		var timerId=null;
		function newtext(){
			clearTimeout(timerId);
			document.title=text.substring(1,text.length)+text.substring(0,1);
			text=document.title.substring(0,text.length);
			timerId=setTimeout(newtext,300)
		}
		newtext();

	var $oItem1=$('.item1');
	var $oItem2=$('.item2');
	var $oItem3=$('.item3');
	//var timerP1=null;
	var keydo=true;        //图层打开时 后面的左右键不能按
	var wheelgo=true;      //滑轮动
   
   //滑轮
   var nWheel=0;
 function onwheelgo(){
	addMouseWheel(window,function(down){
	  if(down){
	  	if(!wheelgo)return;
	  		wheelgo=false;
			nWheel++;
        if(nWheel==2){ showtext()}
		if(nWheel>2){nWheel=2};
         
			$('html,body').stop().animate({'scrollTop':nWheel*$oItem1.height()+'px'},{ duration: 900,easing:'easeOutBounce',complete:function(){
		wheelgo=true;}});
	  }
	  else{
	  		if(!wheelgo)return;	  	
	  		wheelgo=false;
	  		nWheel--;
	  	if(nWheel==2){ showtext()}	
	  	if(nWheel<0){nWheel=0};
	  	$('html, body').stop().animate({'scrollTop':nWheel*$oItem1.height()+'px'},{duration: 900,easing:'easeOutBounce',complete:function(){
		wheelgo=true;}});
	  }
	});
};
onwheelgo();

	//点击导航 滚动屏幕
	var $aNav_b=$('.nav_btn:lt(3)');
	$aNav_b.click(function(){
		$('html, body').stop().animate({'scrollTop':($(this).index())*$oItem1.height()+'px'},{duration: 900,easing:'easeOutBounce'});
	})


	//第1页
	//轮播图

		
	var $oP1Banner=$('#p1banner');
	var $aP1BannerList=$('#p1banner ul li');
	var $oP1BannerPrev=$('#p1banner .prev');
	var $oP1BannerNext=$('#p1banner .next');
	var $aP1BannerBtn=$('#p1banner ol li');
	var ip1Now=0;

	$aP1BannerBtn.mouseover(function(){
		ip1Now=$(this).index();
			p1go();
	});

	$oP1BannerPrev.click(function(){
		ip1Now--;
		if(ip1Now==-1){
			ip1Now=3
		}
			p1go();
	});
	$oP1BannerNext.click(function(){
		ip1Now++;
		if(ip1Now==4){
			ip1Now=0;	
		}
			p1go();
	});

	function p1go(){
		$aP1BannerBtn.removeClass("active");
		$aP1BannerBtn.eq(ip1Now).addClass("active");

		$aP1BannerList.css('zIndex',0);
		$aP1BannerList.eq(ip1Now).css('zIndex',1);

		$aP1BannerList.stop().animate({'opacity':0});
		$aP1BannerList.eq(ip1Now).stop().animate({'opacity':1},2000);		
	}

	 var timerP1=setInterval(function(){
		ip1Now++;
		if(ip1Now==4){
			ip1Now=0;	
		}
			p1go();
	},6000);

	$oP1Banner.mouseover(function(){
		$oP1BannerPrev.css('opacity',1);
		$oP1BannerNext.css('opacity',1);
		clearInterval(timerP1);
	});

	$oP1Banner.mouseout(function(){
		$oP1BannerPrev.css('opacity',0);
		$oP1BannerNext.css('opacity',0);

		timerP1=setInterval(function(){
		ip1Now++;
		if(ip1Now==4){
			ip1Now=0;	
		}
			p1go();
		},6000)
	});

	//第2页
	//第二页放大特效
	(function(){
	var arrImg=['list1','list2','list3','list4','list5','list6','list7','list8']
	var aListMsgImg=document.getElementById('list_msg').children;
	for(var i=0;i<aListMsgImg.length;i++){
		aListMsgImg[i].style.background='url(images/'+arrImg[i]+'.jpg) no-repeat center center';
	}
	var zIndex=2;
	var aPos=[];	//[{left:10,top:10},{},..]
	for(var i=0;i<aListMsgImg.length;i++){
			aPos.push({left:aListMsgImg[i].offsetLeft,top:aListMsgImg[i].offsetTop});
			aListMsgImg[i].style.left=aPos[i].left+'px';
			aListMsgImg[i].style.top=aPos[i].top+'px';	
	}
	for(var i=0;i<aListMsgImg.length;i++){
			aListMsgImg[i].style.position='absolute';	
			aListMsgImg[i].style.margin=0;
	}
	for(var i=0;i<aListMsgImg.length;i++){
	aListMsgImg[i].index=i;
		aListMsgImg[i].onmouseover=function(){
			this.style.zIndex=3;
			//marginLeft	=	-(bBox.w-sBox.w)/2
			move(this,{width:323,height:323,marginLeft:-(323-230)/2,marginTop:-(323-230)/2});
			move(this.children[0],{top:223});	
		};	
		aListMsgImg[i].onmouseout=function(){
			this.style.zIndex=2;
			move(this,{width:230,height:230,marginLeft:0,marginTop:0});	
			move(this.children[0],{top:323});
		};	
	}
})();
	//第二页1.无缝运动
(function(){
	var oWuFen=document.getElementById('wufen');
	var oWfPrevi=document.getElementById('wfprevi');
	var oWfNext=document.getElementById('wfnext');
	var oWfUl=oWuFen.getElementsByTagName('ul')[0];
	var aWfLi=oWuFen.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var aWfImg=oWfUl.children;
	var ready=true;
	var arrImg2=['1','2','3','4'];
		var wfnow=0;
	for(var i=0;i<aWfImg.length;i++){
		aWfImg[i].style.backgroundImage='url(images/wufen/'+arrImg2[i]+'.jpg)';
	}
		oWfUl.innerHTML+=oWfUl.innerHTML;
		oWfUl.style.width=(700)*(oWfUl.children.length)+'px';

		for(var i=0;i<aWfLi.length;i++){
			(function(index){
			aWfLi[i].onmouseover=function(){
				wfnow=index;
				tab();
			}
		})(i);
		}

	function tab(){
		for(var i=0;i<aWfLi.length;i++){
			aWfLi[i].className='';
		}
		if(wfnow==4){
			aWfLi[0].className='active';
		}else{
			aWfLi[wfnow].className='active';
		}
		move(oWfUl,{left:-wfnow*700},{complete:function(){
			ready=true;
			if(wfnow==4){
				oWfUl.style.left=0;
				wfnow=0;
			}
		}})
	}

	oWfNext.onclick=function(){
		if(!ready)return;
		ready=false;
		wfnow++;
		tab();
	}

	oWfPrevi.onclick=function(){
		if(!ready)return;
		ready=false;
		if(wfnow==0){
			wfnow=3;
			oWfUl.style.left=-5600/2+'px';
		}else{
			wfnow--;
		}
		tab();
	}

	var timer=setInterval(function(){
		wfnow++;
		tab();
	},3000);

	oWuFen.onmouseover=function(){
		clearInterval(timer);
	}

	oWuFen.onmouseout=function(){
		 timer=setInterval(function(){
			wfnow++;
			tab();
		},3000);
	};

})();

	//第二页2.H5拖拽时钟
(function(){
	var oClockdrag=document.getElementById('clockdrag');
	var oH=oClockdrag.querySelector('.hours');
	var oM=oClockdrag.querySelector('.min');
	var oS=oClockdrag.querySelector('.sec');
	for(var i=0;i<60;i++){
		var oSpanClock=document.createElement('span');

		if(i%5==0){
			oSpanClock.classList.add('on');
			
			if(i==0){
				oSpanClock.innerHTML="<em>12</em>";
			}else{
				oSpanClock.innerHTML="<em>"+i/5+"</em>";
			}
			oSpanClock.children[0].style.transform="rotate("+-i*6+"deg)";
		}
		oSpanClock.style.transform="rotate("+i*6+"deg)";
		oClockdrag.appendChild(oSpanClock);
	}

	clock();
	setInterval(clock,30);
	function clock(){
		var oDate=new Date();
		var iH=oDate.getHours();
		var iM=oDate.getMinutes();
		var iS=oDate.getSeconds();
		var iMs=oDate.getMilliseconds();

		oH.style.transform="rotate("+(iH*30+iM/60*30)+"deg)";
		oM.style.transform="rotate("+(iM*6+iS/60*6)+"deg)";
		oS.style.transform="rotate("+(iS*6+iMs/1000*6)+"deg)"
	};
	var x=0;
	var y=0;
	oClockdrag.onmousedown=function(ev){
		disX=ev.clientX-x;
		disY=ev.clientY-y;

		document.onmousemove=function(ev){
			x=ev.clientX-disX;
			y=ev.clientY-disY;
			if(x>1200-300-20)x=900-20;
			if(x<0)x=0;
			if(y<0)y=0;
			if(y>600-300-20)y=300-20;
		
			oClockdrag.style.transform="translate("+x+"px,"+y+"px)";
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
		};
		return false;
	}
})()

	//第二页3.手风琴效果
	var oAccordion=document.getElementById('accordion');
	var aAccordion=oAccordion.children;
	for(var i=0;i<aAccordion.length;i++){
		aAccordion[i].index=i;
		aAccordion[i].onmouseover=function(){
			for(var i=0;i<aAccordion.length;i++){
				if(i<=this.index){
					//左走
					move(aAccordion[i],{left:i*20})
				}else{
					//右走
					move(aAccordion[i],{left:559+(i-1)*20})
				}
			}
		};
	}


	//第二页4.乒乓球
	var oTableTennis=document.getElementById('tabletennis');
	var oTableTennisDiv=oTableTennis.getElementsByTagName('div')[0];
	var oTableTennisSpan=oTableTennis.getElementsByTagName('span')[0];
	var TableSpeedX=0;
	var TableSpeedY=0;
	var TableLastX=0;
	var TableLastY=0;
	var TableTimer=null;


	oTableTennisSpan.onmousedown=function(ev){
		clearInterval(TableTimer);
		var oEvt=ev||event;
		var disX=oEvt.clientX-oTableTennisSpan.offsetLeft;
		var disY=oEvt.clientY-oTableTennisSpan.offsetTop;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			oTableTennisSpan.style.left=oEvt.clientX-disX+'px';
			oTableTennisSpan.style.top=oEvt.clientY-disY+'px';

			TableSpeedX=oTableTennisSpan.offsetLeft-TableLastX;
			TableSpeedY=oTableTennisSpan.offsetTop-TableLastY;

			TableLastX=oTableTennisSpan.offsetLeft;
			TableLastY=oTableTennisSpan.offsetTop;
		};

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			oTableTennisSpan.releaseCapture && oTableTennisSpan.releaseCapture();
			startmove();
		};
		oTableTennisSpan.setCapture && oTableTennisSpan.setCapture();
		return false;

	};

	function startmove(){
		clearInterval(TableTimer);

		TableTimer=setInterval(function(){
			//console.log(TableDivH);
				TableSpeedY+=2;
			var l=oTableTennisSpan.offsetLeft+TableSpeedX;
			var t=oTableTennisSpan.offsetTop+TableSpeedY;

				if(t>=oTableTennisDiv.offsetHeight-oTableTennisSpan.offsetHeight){
					t=oTableTennisDiv.offsetHeight-oTableTennisSpan.offsetHeight;
					TableSpeedY*=-0.9;
					TableSpeedX*=0.9;
				}else if(t<0){
					t=0;
					TableSpeedY*=-0.9;
					TableSpeedX*=0.9;				
				}

				if(l>oTableTennisDiv.offsetWidth-oTableTennisSpan.offsetWidth){
					l=oTableTennisDiv.offsetWidth-oTableTennisSpan.offsetWidth;
					TableSpeedX*=-0.9;
					TableSpeedY*=0.9;
				}else if(l<0){
					l=0;
					TableSpeedX*=-0.9;
					TableSpeedY*=0.9;					
				}

				oTableTennisSpan.style.left=l+'px';
				oTableTennisSpan.style.top=t+'px';

				if(Math.abs(TableSpeedX)<1){
					TableSpeedX=0;
				}
				if(Math.abs(TableSpeedY)<1){
					TableSpeedY=0;
				}

				if(TableSpeedY==0 && TableSpeedX==0 && t==oTableTennisDiv.offsetHeight-oTableTennisSpan.offsetHeight){
					clearInterval(TableTimer);
				}

		},30)
	};

	//第二页5.拉钩
(function(){
	var oDrawHook=document.getElementById('drawhook');
	var aDrawHookLi=oDrawHook.children;
	var aDrawHookImg=oDrawHook.getElementsByTagName('img');
	var arrDrrawImg=['lg9','lg10','lg11','lg12','lg13','lg14','lg15','lg16'];
	for(var i=0;i<aDrawHookImg.length;i++){
		aDrawHookImg[i].src='images/lagou/'+arrDrrawImg[i]+'.jpg';
	}

	for(var i=0;i<aDrawHookLi.length;i++){
		lagou(aDrawHookLi[i]);
	}
document.qu
	function getDir(obj,oEvent){
		var x=oEvent.clientX-(obj.offsetLeft+obj.offsetWidth/2);
		var y=obj.offsetHeight/2+obj.offsetTop-oEvent.clientY;
				// 0左 1下 2右 3 上
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	}

	function lagou(obj){
		obj.onmouseover=function(ev){
			var oEvent=ev||event;
			var oFrom=oEvent.fromElement||oEvent.relatedTarget;
			if(obj.contains(oFrom)){
				return;
			}
			var oSpan=this.children[1];
			var n=getDir(this,oEvent);
			switch(n){
				case 0:
				oSpan.style.left='-250px';
				oSpan.style.top='0';
				break;

				case 1:
				oSpan.style.left='0';
				oSpan.style.top='250px';
				break;

				case 2:
				oSpan.style.left='250px';
				oSpan.style.top='0';
				break;

				case 3:
				oSpan.style.left='0';
				oSpan.style.top='-250px';
				break;
			}
			move(oSpan,{left:0,top:0})
		}

		obj.onmouseout=function(ev){
			var oEvent=ev||event;
			var oTo=oEvent.toElement||oEvent.relatedTarget;
			if(obj.contains(oTo)){
				return;
			}
			var oSpan=this.children[1];
			var n=getDir(this,oEvent);
			switch(n){
				case 0:
				move(oSpan,{left:-250,top:0})
				break;

				case 1:
				move(oSpan,{left:0,top:250})
				break;

				case 2:
				move(oSpan,{left:250,top:0})
				break;

				case 3:
				move(oSpan,{left:0,top:-250})
				break;
			}			
		}
	}
})();

	//第二页6.键盘
	var showball={};
	function a(e){
		e.preventDefault();
		var keyCode=e.keyCode;

	var r=parseInt(0+Math.random()*(255-0));
	var g=parseInt(0+Math.random()*(255-0));
	var b=parseInt(0+Math.random()*(255-0));
	var c='rgb('+r+','+g+','+b+')';
		//alert(keyCode);
		var $this=$('span[keycode='+keyCode+']');
		$this.addClass('active');
		$this.css({'background-color':c,'border-color':c})
		if(showball[keyCode]){
			showball[keyCode]+=1;
		}else{
			showball[keyCode]=1;
		}
			ballup($this,showball[keyCode],c,'#keymain');
		//return false;
	};

	function b(e){
		e.preventDefault();
		var keyCode=e.keyCode;
	var r=parseInt(0+Math.random()*(255-0));
	var g=parseInt(0+Math.random()*(255-0));
	var b=parseInt(0+Math.random()*(255-0));
	var c='rgb('+r+','+g+','+b+')';
		//alert(keyCode);
		var $this=$('span[keycode='+keyCode+']');
		$this.removeClass('active');
		$this.css({'background-color':"#fff",'border-color':"#ccc"});
		//return false;
	}
		function ballup($key,n,c,id){
		var w=$key.innerWidth();
		var h=$key.innerHeight();

		var l=$key.offset().left+((w-25)/2)-115;
		var t=$key.offset().top+((h-25)/2)-1060;
		var $ball=$('<span class="ball">'+n+'</span>').css({'left':l,'top':t,'background-color':c});
		//console.log($ball.css('top'));
		$ball.appendTo(id);
			$ball.stop().animate({top:t-60},{complete:function(){
				$ball.fadeOut(400,function(){
					$ball.remove();
				})
			}})

		}
//第二页7.canvas 屏保
(function(){
	function rnd(n,m){
		return Math.floor(Math.random()*(m-n)+n);
	}
	var oC=document.getElementById('oc');
	var gb=oC.getContext("2d");

	var canvasH=oC.height=600;
	var canvasW=oC.width=1200;

	//存5个点
	var aPoint=[];
	var canvasn=5;

	for(var i=0;i<canvasn;i++){
		aPoint[i]={
			w:1,
			h:1,
			x:rnd(0,1200),
			y:rnd(0,600),
			speedx:rnd(-10,10),
			speedy:rnd(-10,10)
		}
	}


	var oldPoint=[];
	setInterval(function(){
		gb.clearRect(0,0,oC.width,oC.height);

		//绘制点
		for(var i=0;i<canvasn;i++){
			drawPoint(aPoint[i]);

			//移动改变X Y
			aPoint[i].x +=aPoint[i].speedx;
			aPoint[i].y +=aPoint[i].speedy;

			if(aPoint[i].x<0){
				aPoint[i].x=0;
				aPoint[i].speedx*=-1;
			}
			if(aPoint[i].x>canvasW){
				aPoint[i].x=canvasW;
				aPoint[i].speedx*=-1;
			}

			if(aPoint[i].y<0){
				aPoint[i].y=0;
				aPoint[i].speedy*=-1;
			}
			if(aPoint[i].y>canvasH){
				aPoint[i].y=canvasH;
				aPoint[i].speedy*=-1;
			}
		}
		//连接点
		gb.beginPath();
		gb.moveTo(aPoint[0].x,aPoint[0].y);
		for(var i=0;i<canvasn;i++){
			gb.lineTo(aPoint[i].x,aPoint[i].y);
		}
		gb.closePath();
		gb.strokeStyle='#fff';
		gb.stroke();

		//影子
		var arr=[];
		for(var i=0;i<canvasn;i++){
			arr.push({x:aPoint[i].x,y:aPoint[i].y})
		}

		oldPoint.push(arr);

		while(oldPoint.length>10){
			oldPoint.shift();
		}

		for(var i=0;i<oldPoint.length;i++){
			gb.beginPath();
			gb.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
			for(var j=0;j<canvasn;j++){
				gb.lineTo(oldPoint[i][j].x,oldPoint[i][j].y);
			}
			gb.closePath();
			var opacity=i/oldPoint.length;
			gb.strokeStyle='rgba(255,0,0,'+opacity+')';
			gb.stroke();
		}	


	},30)
	function drawPoint(p){
		gb.fillStyle = "#fff";
		gb.fillRect(p.x,p.y,p.w,p.h);
		gb.strokeRect(p.x,p.y,p.w,p.h);
	}
})();

//第二页8.百度一下
//(function(){
var oBaiDu=document.getElementById('baidu');
var oBaiDuSearCh=oBaiDu.querySelector('.baidu_search');
var oBaiDuSearChInput=oBaiDuSearCh.querySelector('input');
var oBaiDuSearChA=oBaiDuSearCh.querySelector('a');
var oBaiDuUl=document.querySelector('.baidu_ul');

	oBaiDuSearChInput.onkeyup=function(){
		oBaiDuUl.innerHTML='';

		jsonp({
			url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
			data:{wd:oBaiDuSearChInput.value},
			success:function(json){
				oBaiDuUl.style.display='block';
				if(json.s.length==0){
					oBaiDuUl.style.display='none';
				}else{
					oBaiDuUl.innerHTML='';
					for(var i=0;i<json.s.length;i++){
						var oBaiduLi=document.createElement('li');
						oBaiduLi.innerHTML='<a href="https://www.baidu.com/s?&wd='+json.s[i]+'">'+json.s[i]+'</a>';
						oBaiDuUl.appendChild(oBaiduLi);
						oBaiDuSearChA.href='https://www.baidu.com/s?&wd='+oBaiDuSearChInput.value+'';
					}
				}
			}
		})
	};
//})();



	//作品展示阴影
	var maskwheel=true;
	var $oMaskList=$('#maskList');
	var aShowInfo=getByClass(document,'showinfo');
	var aListMsgImg=document.getElementById('list_msg').children;
	for(var i=0;i<aListMsgImg.length;i++){
	    aListMsgImg[i].index=i;
		aListMsgImg[i].onclick=function(){
			$oMaskList.get(0).style.zIndex=3;                        //作品层级
			//marginLeft	=	-(bBox.w-sBox.w)/2
			$oMaskList.get(0).style.opacity='1';
			$oMaskList.get(0).style.display='block';

			wheelgo=false;          //滑轮不移动
			onwheelgo();

			aShowInfo[this.index].style.display='block';
			aShowInfo[this.index].style.zIndex=4;                    //作品阴影层级
			move(aShowInfo[this.index],{'opacity':1});
			return false;//
		};
	};
	var aShowClose=getByClass(document,'showClose');
	for(var i=0;i<aShowClose.length;i++){
		aShowClose[i].onclick=function(){

		wheelgo=true;      //滑轮移动
		onwheelgo();

	document.removeEventListener('keydown',a,false);       //键盘可按 还原默认方式
	document.removeEventListener('keyup',b,false);         //键盘可按 还原默认方式

			this.parentNode.style.display='none';
			$oMaskList.get(0).style.opacity='0';
			$oMaskList.get(0).style.display='none';
		};
	}

$oP2listkey=$('.p2listkey');
$oP2listkey.click(function(){
		document.addEventListener('keydown',a,false);        //彩色键盘可按 取消默认方式
		document.addEventListener('keyup',b,false);          //彩色键盘可按 取消默认方式	
})	

	//第3页
function showtext(){
var oP3like=document.getElementById('p3like');
var p3str="At the time, Think what The coming days would be long. Have the opportunity, In fact, Life is to do subtraction, See a little side .";

for(var i=0;i<p3str.length;i++){
	var olikespan=document.createElement('span');
	olikespan.innerHTML=p3str[i];
	oP3like.appendChild(olikespan);
}

var aLikespan=oP3like.children;
var oi=0;

var oliketimer=setInterval(function(){
	aLikespan[oi].className='active';
	oi++;
	if(oi==p3str.length){
		clearInterval(oliketimer);
	}
},100)
};

var op3btn3=document.querySelector('.btn3');
 op3btn3.onclick=function(){
 	showtext();
 }


	//个人信息
	$oInfoBtn=$('.btn4');
	$oMask=$('#mask');
	$oMyInfo=$('#my_info');
	$oInfoBtn.click(function(){
		$oMask.stop().animate({'opacity':1},1500);
		$oMask.css('display','block');

			wheelgo=false;          //滑轮不移动
			onwheelgo();

		$oMyInfo.stop().animate({'opacity':1},1500);
		$oMyInfo.css('display','block');
	});

	$oMyInfoClose=$('#my_info_close');
	$oMyInfoClose.click(function(){		
		$oMask.stop().animate({'opacity':0},1500);
		$oMask.css('display','none');

		wheelgo=true;      //滑轮移动
		onwheelgo();


		$oMyInfo.stop().animate({'opacity':0},1500);
		$oMyInfo.css('display','none');			
	})



	//个人信息展示
	var oCallMe=document.getElementById('callme');
	var Callx=-30;
	var Cally=0;

	oCallMe.onmousedown=function(ev){
		calldisX=ev.clientX-Cally;
		calldisY=ev.clientY-Callx;
		document.onmousemove=function(ev){
			Cally=ev.clientX-calldisX;
			Callx=ev.clientY-calldisY;

			if(Callx>300){
				Callx=300;
			}else if(Callx<-300){
				Callx=-300;
			}

			if(Cally>300){
				Cally=300;
			}else if(Cally<-300){
				Cally=-300;
			}

			oCallMe.style.transform='perspective(800px) rotateX('+(-Callx/10)+'deg) rotateY('+Cally/10+'deg)'
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
		}
		return false;
	}



});          //JQ end


