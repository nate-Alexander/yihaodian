/*
1.解决IE8里面不支持getElementsByClassName问题
2.可以获取与设置纯文本的兼容函数
3.获取样式
4.获取类名,ID名,标签名
5.getChilds(parent)获取元素子节点的兼容函数
6.获得第一个子元素
7获得最后一个子元素
8获得一个指定子节点
9获得下一个兄弟节点
10获得上一个兄弟节点
12插入到某个对象之后
11对象.insertBefore(obj,obj1)
6获得第一个子元素
7获得最后一个子元素
8获得一个指定子节点
9获得下一个兄弟节点
10获得上一个兄弟节点
12插入到某个对象之后
11对象.insertBefore(obj,obj1)

*/




//批量加行内样式
//taoxin[this.index].style.cssText="display:block;box-shadow:1px 0px 5px rgba(0,0,0,0.5)"



//功能说明：解决IE8里面不支持getElementsByClassName问题
/*
	参数说明：
	str 多个类名集合后的字符串
	val 想找的类名
	getClass 
	classname
	obj
*/
	function getClass(classname,obj)
	{
		var obj=obj||document;
		if(obj.getElementsByClassName)//判断是W3C浏览器
		{
			return obj.getElementsByClassName(classname);
		}
		else//否则为IE8
		{
			var all=obj.getElementsByTagName("*");//获取所有标签名
			var arr=[];
			for (var i=0;i<all.length; i++) 
			{
				if(checkRel(all[i].className,classname))
				{
					arr.push(all[i]); 
				}
			}
			return arr;
		}
	}
	function checkRel(str,val)
	{
		var newarr=str.split(" ");//字符串转换成数组，用 分割；
		for(var j=0;j<newarr.length;j++)
		{//遍历数组
			if(newarr[j]==val)//数组值与val相同
			{
				return true;//返回真，表示找到
			}
		}
		return false;
	}
	/*
	var box=getClass("box")[0];
	var innerbox=getClass("innerbox",box);
	alert(innerbox.length);
	*/





//2可以获取与设置纯文本的兼容函数
/*
参数说明：
	obj 哪个对象用这个
	val 接收第二个实参，表示设置一个文本
*/
function getText(obj,val)
{
	if(val==undefined)//如果undefined,表示只有一个函数，这个函数实现的是获取文本(复制)
	{
		if(obj.innerText)//如果为真是IE8浏览器
		{
			return obj.innerText;
		}
		else//否则为假是W3C火狐浏览器
		{
			return obj.textContent;
		}
	}
	else//如果val不是undefined,表示要进行替换
	{
		if(obj.innerText||obj.innerText=="")//如果为真是IE8浏览器；IE8当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
		{
			obj.innerText=val;
		}
		else//否则为假是W3C火狐浏览器
		{
			obj.textContent=val;
		}
	}
}










//3获取样式
/*
参数说明：
obj 哪个对象
attr 哪个属性
*/
function getStyle(obj,attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,null)[attr];
	}
}










/*
4.
	$(".box"); 获取类名
	$("#box"); 获取ID名
	$("div"); 获取标签名
*/
function $(select,obj)
{
	var obj=obj||document;
	if(typeof select=="string")
	{
		select=select.replace(/^\s*|\s*$/g,"");//去掉字符串前后的空格
		if(select.charAt(0)==".")//类名
		{
			return getClass(select.slice(1),obj);
		}
		else if(select.charAt(0)=="#")//ID名
		{
			return obj.getElementById(select.slice(1));
		}
		else if(/^[a-z|1-6]{1,10}$/g.test(select))//标签
		{
			return obj.getElementsByTagName(select);
		}
	}
	else if(typeof select=="function")
	{
		window.onload=function()
		{
			select();
		}
	}
}









//5.getChilds(parent)获取元素子节点的兼容函数
/*
	"a" 获取元素子节点的兼容函数
	"b" 获取元素+元素

	原理：先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存到数组里；
*/
function getChilds(parent,type)
{
	var type=type||"a";
	var childs=parent.childNodes//所有的儿子
	var arr=[];
	for (var i=0;i<childs.length;i++)
	{
		if(type=="a")
		{
			if(childs[i].nodeType==1)
			{
				arr.push(childs[i]);
			}
		}
		else if(type=="b")
		{
			if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")))
			{
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}



//6获得第一个子元素
/**/
function getFirst(parent)
{
	return getChilds(parent)[0];
}


//7获得最后一个子元素
/**/
function getLast(parent)
{
	return getChilds(parent)[getChilds(parent).length-1];
}

//8获得一个指定子节点
/**/
function getNum(parent,num)
{
	return getChilds(parent)[num];
}

//9获得下一个兄弟节点
/**/
function getNext(obj)
{
	var next=obj.nextSibling;
	if(next==null)
	{
		return false;
	}
	while(next.nodeType==3||next.nodeType==8)
	{
		next=next.nextSibling;
		if(next==null)
		{
			return false;
		}
	}
	return next;
}

//10获得上一个兄弟节点

function getUp(obj)
{
	var up=obj.previousSibling;
	if(up==null)
	{
		return false;
	}
	while(up.nodeType==3||up.nodeType==8)
	{
		up=up.previousSibling;
	}
	return up;
}


//12插入到某个对象之后
//11对象.insertBefore(obj,obj1)插入到某个对象之前
//重点    给对象的原型添加此方法
//原理   找到第二个参数的下一个兄弟节点 将第一个参数插入到此兄弟节点之前
/*参数说明 
	obj1 要插入的对象
	obj2 哪个对象之后
*/

Object.prototype.insertAfter=function(obj1,obj2)
{
	var newobj=getNext(obj2);
	if(newobj)
	{
		this.insertBefore(obj1,newobj);
	}
	else
	{
		this.appendChild(obj1);
	}
}






//兼容问题(火狐与谷歌)    13获取滚动条与页面顶部的距离
/**/
function getScrollT()
{
	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
	return scrollT;
}














//14同一个元素添加多个事件的兼容函数
/*
	obj 给哪个对象添加
	ev  什么事件"click" "dblclick"
	fun 事件处理程序
*/
function addEvent(obj,ev,fun)
{
	if(obj.addEventListener)
	{
		return obj.addEventListener(ev,function(){
			fun.call(obj);
		},false);
	}
	else
	{
		return obj.attachEvent("on"+ev,function(){
			fun.call(obj);
		});//在IE8中,this不表示当前对象,而是指向window,
	}
}

//15同一个元素删除多个事件的兼容函数
/*
	obj 给哪个对象添加
	ev  什么事件"click" "dblclick"
	fun 事件处理程序
*/
function removeEvent(obj,ev,fun)
{
	if(obj.removeEventListener)
	{
		return obj.removeEventListener(ev,function(){
			fun.call(obj);
		},false);
	}
	else
	{
		return obj.detachEvent("on"+ev,function(){
			fun.call(obj);
		});//在IE8中,this不表示当前对象,而是指向window,
	}
}








//16获取浏览器宽高
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}






/*
参数说明：
	obj 哪个对象添加滚轮事件
	upfun 处理滚轮向上的函数
	downfun 处理滚轮向下的函数
*/
function mouseWheel(obj,upfun,downfun)
{
	if(obj.attachEvent)
	{
		obj.attachEvent("onmousewheel",scrollFn);
		//IE、 opera
	}
	else if(obj.addEventListener)
	{
		obj.addEventListener("mousewheel",scrollFn,false);
		//chrome,safari -webkitdocument.
		addEventListener("DOMMouseScroll",scrollFn,false);
		//firefox -moz-
	}
	function scrollFn(e)
	{
		var ev=e||window.event;

		if(ev.preventDefault)
		{
			ev.preventDefault(); //阻止默认浏览器动作(W3C)
		}
		else
		{
			ev.returnValue = false;//IE中阻止函数器默认动作的方式
		}


		var num=ev.detail||ev.wheelDelta;
		if(num==-3||num==120)//向上
		{
			if(upfun)
			{
				upfun();
			}
		}
		//wheelDelta;
		if(num==3||num==-120)//向下
		{
			if(downfun)
			{
				downfun();
			}
		}
	}
}










//15.hover不能用于事件委托
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }