
//****单个使用是要getByClass(XXX,XXX)[第几个]!!!!!!!!!!

function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return 	oParent.getElementsByClassName(sClass);
	}else{
		var aEle=oParent.getElementsByTagName('*');
		var result=[];
		for(var i=0;i<aEle.length;i++){
			var tmpArr=aEle[i].className.split(' ');
			for(var j=0;j<tmpArr.length;j++){
				if(tmpArr[j]==sClass){
					result.push(aEle[i]);
					break;
				}
			}
		}
		return result;
	}
};