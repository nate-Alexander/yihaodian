$(function(){

	/*图片延迟加载*/
	window.onscroll=function()
	{
		var ch=document.documentElement.clientHeight;
		var scon=$(".scon");
	//alert(scon.length);
	var scrollT=getScrollT();
	for(var i=0;i<scon.length;i++)
	{
		if(scon[i].offsetTop<scrollT+ch)
		{
			var simg=$(".con-img",scon[i]);
			for(var j=0;j<simg.length;j++)
			{
				simg[j].src=simg[j].getAttribute("aa");
			}
		}
	}

	/*楼层跳转*/


	var right=$(".right")[0];
	var scrollT=getScrollT();

	var scon=$(".scon");
	var sconRight=$(".scon-right");
	var rightUp=$(".right-up");	
	/*显示*/
	if(scrollT>=1000)
	{
		right.style.display="block";
		rightUp[0].style.display="block";
	}
	else
	{
		right.style.display="none";
		rightUp[0].style.display="none";
	}
	/*滚动条控制楼层*/
	for(var i=0;i<scon.length;i++)
	{
		//scon[i].index=i;
		scon[i].t=scon[i].offsetTop;
		if(scon[i].t<(scrollT+80))
		{
			for(var j=0;j<rightUp.length;j++)
			{
				rightUp[j].style.display="none";
			}
			rightUp[i].style.display="block";
		}
	}

	/*按钮控制滚动条*/
	for(var i=0;i<sconRight.length;i++)
	{
		sconRight[i].index=i;
		sconRight[i].onmouseover=function()
		{
			var scrollT=getScrollT();
			for(var j=0;j<sconRight.length;j++)
			{
				//if((j+1)<=10)
				//{
					if(scon[j].offsetTop<=(scrollT+80)&&(scrollT+80)<=scon[j+1].offsetTop)
					{   										
						rightUp[j].style.display="block";
						
						//break;
					}
				//}

			}

			rightUp[this.index].style.display="block";
			sconRight[this.index].onclick=function()
			{
				var obj=document.documentElement.scrollTop?document.documentElement:document.body;
				animate(obj,{scrollTop:scon[this.index].t-30})
			}
		}
		sconRight[i].onmouseout=function()
		{
			//var flag=true;
			for(var j=0;j<rightUp.length;j++)
			{
				rightUp[j].style.display="none";
				//if(flag)
				//{
					var scrollT=getScrollT();
					if(scon[j].offsetTop<=(scrollT+80)&&(scrollT+80)<=scon[j+1].offsetTop)
					{
						rightUp[j].style.display="block";
						//flag=false;
					}
					//break;
				//}
			}
			//rightUp[this.index].style.display="block";
		}
	}
	/*回到顶部*/
	var rightTop=$(".right-top")[0];
	var rightTopWord=$(".right-top-word")[0];
	rightTop.onmouseover=function()
	{
		rightTopWord.style.display="block";
	}
	rightTop.onmouseout=function()
	{
		rightTopWord.style.display="none";
	}
	rightTop.onclick=function()
	{
		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		animate(obj,{scrollTop:0});
	}
	/*用户反馈*/
	var rightBottom=$(".right-bottom")[0];
	var rightBottomWord=$(".right-bottom-word")[0];
	rightBottom.onmouseover=function()
	{
		rightBottomWord.style.display="block";
	}
	rightBottom.onmouseout=function()
	{
		rightBottomWord.style.display="none";
	}





}





/* 内容楼层 中间 大图 轮播 */

function conbInnerLobo(a){
	var conbInner=$(".con-b-inner")[a];
	var conbInnerBigbox=$(".con-b-inner-bigbox",conbInner)[0];
	var conbInnerJindutiaoInner=$(".con-b-inner-jindutiao-inner",conbInner);

		//alert(conbInnerBigbox.length)
		var conbInnerJindutiaoup=$(".con-b-inner-jindutiao-up",conbInner);
		//var conbInnerBigboxAa=$(".con-b-inner-bigbox-aa");
		/*起始加载 第一个进度条加载*/
		var w=0;
		conbInnerJindutiaoup[w].style.height=7+"px";
		var x=0;
		function movextime()
		{
			conbInnerJindutiaoup[w].style.height=7+"px";				
			x=x+1;
			conbInnerJindutiaoInner[w].style.width=x+"px";				
			if(x>=30)
			{ 
				x=30;
				clearInterval(t4);
			}			
		}
		var t4=setInterval(movextime,80);
		function movex()
		{
			//alert(w)
			w++;
			if(w==3)
			{
				w=0;
				for(var i=0;i<conbInnerJindutiaoInner.length;i++)
				{
					conbInnerJindutiaoInner[i].style.width=0;
					conbInnerJindutiaoup[i].style.height=6+"px";
				}
				animate(conbInnerBigbox,{left:0},600,Tween.Linear,function(){
					x=0;
						//conbInnerJindutiaoInner[w].style.width=x+"px";
			            //clearInterval(t4)
			            t4=setInterval(movextime,80);
			        });		
			}
			else
			{
				for(var i=0;i<conbInnerJindutiaoInner.length;i++)
				{
					conbInnerJindutiaoInner[i].style.width=0;
					conbInnerJindutiaoup[i].style.height=6+"px";
				}
				//alert(w)
				animate(conbInnerBigbox,{left:-330*w},600,Tween.Linear,function(){
					x=0;
					t4=setInterval(movextime,80);
				});
			}
			//w++;		
		}
		var t3=setInterval(movex,3600);

		/*按钮 进度条 控制*/

		for(var i=0;i<conbInnerJindutiaoup.length;i++)
		{
			conbInnerJindutiaoup[i].index=i;
			conbInnerJindutiaoup[i].onmouseover=function()
			{
				clearInterval(t3);
				clearInterval(t4);
				w=this.index;
				for(var j=0;j<conbInnerJindutiaoup.length;j++)
				{
					conbInnerJindutiaoup[j].style.height=6+"px";
					conbInnerJindutiaoInner[j].style.width=0+"px";
				}
				conbInnerJindutiaoup[this.index].style.height=7+"px";
				conbInnerJindutiaoInner[this.index].style.width=30+"px";
				animate(conbInnerBigbox,{left:-330*w},600,Tween.Linear);	
			}
			conbInnerJindutiaoup[i].onmouseout=function()
			{
				w=this.index;
				conbInnerJindutiaoInner[this.index].style.width=0+"px";

				x=0;
				t4=setInterval(movextime,80);
				t3=setInterval(movex,3600);
			}
		}


		/*   鼠标滑到图片上 不动  原因 闪光盒子在最上层 遮住 滑不到图片上 
		for (var i = 0; i < conbInnerBigboxAa.length; i++) {
			conbInnerBigboxAa[i].index=i;
			conbInnerBigboxAa[i].onmouseover=function()
			{
				clearInterval(t3);
				clearInterval(t4);
				for(var j=0;j<conbInnerJindutiaoup.length;j++)
				{
					conbInnerJindutiaoup[j].style.height=6+"px";
					conbInnerJindutiaoInner[j].style.width=0+"px";
				}
				conbInnerJindutiaoup[this.index].style.height=7+"px";
				conbInnerJindutiaoInner[this.index].style.width=30+"px";
			}
			conbInnerBigboxAa[i].onmouseout=function()
			{
				w=this.index;
				conbInnerJindutiaoInner[this.index].style.width=0+"px";

							var x=0;
							function movextime()
							{
								conbInnerJindutiaoup[w].style.height=7+"px";
								//for(var i=0;i<30;i++)
								//{
									x=x+1;
									conbInnerJindutiaoInner[w].style.width=x+"px";
								//}
								if(x>=30)
								{
									clearInterval(t4);
								}
								//animate(conbInnerJindutiaoInner[w],{width:30},1800);	
							}
							 t4=setInterval(movextime,80);

				t3=setInterval(movex,3600);
			}
		}

		for(var i=0;i<conbInnerJindutiaoup.length;i++)
		{
			conbInnerJindutiaoup[i].index=i;
			conbInnerJindutiaoup[i].onmouseover=function()
			{
				clearInterval(t3);
				clearInterval(t4);
				w=this.index;
				for(var j=0;j<conbInnerJindutiaoup.length;j++)
				{
					conbInnerJindutiaoup[j].style.height=6+"px";
					conbInnerJindutiaoInner[j].style.width=0+"px";
				}
				conbInnerJindutiaoup[this.index].style.height=7+"px";
				conbInnerJindutiaoInner[this.index].style.width=30+"px";

				conbInnerJindutiaoup[this.index].onmouseover=function(){
					animate(conbInnerBigbox,{left:-330*w},600,Tween.Linear);
				}	
			}
		}
		*/
	}

	for (var i = 0; i < 8; i++) {
		conbInnerLobo(i);
	};
























	/*内容7 左侧 轮播*/
	var conAbLbUl=$(".con-ab-lb-ul");
	var conAbLb=$(".con-ab-lb")[0];
	var conAbLbJiantouL=$(".con-ab-lb-jiantoul")[0];
	var conAbLbJiantouR=$(".con-ab-lb-jiantour")[0];
	function moveleft()
	{
		animate(conAbLb,{left:-100},600,Tween.Linear,function(){
			var first=getFirst(conAbLb);
			var last=getLast(conAbLb);
			conAbLb.insertAfter(first,last);
			conAbLb.style.left=0;
		});
	}
	function moveright()
	{
		var first=getFirst(conAbLb);
		var last=getLast(conAbLb);
		conAbLb.insertBefore(last,first);
		conAbLb.style.left=-100+"px";
		animate(conAbLb,{left:0},600,Tween.Linear);
	}
	var t2=setInterval(moveleft,2000);
	conAbLbJiantouL.onmouseover=conAbLbJiantouR.onmouseover=function()
	{
		clearInterval(t2);
	}
	conAbLbJiantouL.onmouseout=conAbLbJiantouR.onmouseout=function()
	{
		t2=setInterval(moveleft,2000);
	}
	conAbLbJiantouL.onclick=function()
	{
		moveleft();
	}
	conAbLbJiantouR.onclick=function()
	{
		moveright();
	}








	/*banner中间轮播*/
	var sidebarConterBanner=$(".sidebar-conter-banner")[0];
	var sidebarConterXuhaoInner=$(".sidebar-conter-xuhao-inner");
	var sidebarConterJiantouLeft=$(".sidebar-conter-jiantou-left")[0];
	var sidebarConterBannerInner=$(".sidebar-conter-banner-inner");
	var sidebarConterJiantouRight=$(".sidebar-conter-jiantou-right")[0];
	var num=0;
//sidebarConterBannerInner[0].style.opacity=1;
sidebarConterBannerInner[0].style.zIndex=4;
sidebarConterXuhaoInner[0].style.backgroundColor="#ff3c3c";

sidebarConterBanner.onmouseover=function()
{
	sidebarConterJiantouLeft.style.display="block";
	sidebarConterJiantouRight.style.display="block";
}
sidebarConterBanner.onmouseout=function()
{
	sidebarConterJiantouLeft.style.display="none";
	sidebarConterJiantouRight.style.display="none";
}
function move(type)
{
	if(type=="l"){
		num--;
		if(num==-1){
			num=7;
		}
	}else if(type=="r"){
		num++;
		if(num==8)
		{
			num=0;
		}
	}
	
	for(var i=0;i<sidebarConterBannerInner.length;i++)
	{
		//sidebarConterBannerInner[i].style.opacity=0;
		sidebarConterBannerInner[i].style.zIndex=3;
		sidebarConterXuhaoInner[i].style.backgroundColor="#ccc";
		//animate(sidebarConterBannerInner[num],{opacity:0},600,Tween.Linear);
	}
	//animate(sidebarConterBannerInner[num],{opacity:1},100,Tween.Linear);
	
	sidebarConterBannerInner[num].style.zIndex=4;
	sidebarConterXuhaoInner[num].style.backgroundColor="#ff3c3c";
	
}
var t1=setInterval(function(){
	move("r")
},3000);
for(var i=0;i<sidebarConterXuhaoInner.length;i++)
{
	sidebarConterXuhaoInner[i].index=i;
	sidebarConterXuhaoInner[i].onmouseover=function()
	{
		clearInterval(t1);
		for(var j=0;j<sidebarConterXuhaoInner.length;j++)
		{
			sidebarConterXuhaoInner[j].style.backgroundColor="#ccc";
			//sidebarConterBannerInner[j].style.opacity=0;
			sidebarConterBannerInner[j].style.zIndex=3;
		}
		//animate(sidebarConterBannerInner[num],{opacity:1},100,Tween.Linear);
		sidebarConterBannerInner[this.index].style.zIndex=4;
		sidebarConterXuhaoInner[this.index].style.backgroundColor="#ff3c3c";
		
	}
	sidebarConterXuhaoInner[i].onmouseout=function()
	{
		t1=setInterval(function(){
			move("r")
		},3000);
		num=this.index;
	}
}
sidebarConterJiantouLeft.onmouseover=sidebarConterJiantouRight.onmouseover=function()
{
	clearInterval(t1);
	sidebarConterJiantouLeft.style.display="block";
	sidebarConterJiantouRight.style.display="block";
}
sidebarConterJiantouLeft.onmouseout=sidebarConterJiantouRight.onmouseout=function()
{
	t1=setInterval(function(){
		move("r")
	},2000);
}

	//alert( sidebarConterXuhaoInner[i].index )
	sidebarConterJiantouLeft.onclick=function()
	{
		move("l");
	}
	sidebarConterJiantouRight.onclick=function()
	{
		move("r");
	}




	/*banner左侧 选项卡 滑动动效*/
	var sidebarLeftLi=$(".sidebar-left-li");
	var sidebarLeftContent=$(".sidebar-left-content");
	var sidebarLeftLiCon=$(".sidebar-left-li-con");
	for(var i=0;i<sidebarLeftLi.length;i++)
	{
		sidebarLeftLi[i].index=i;
		sidebarLeftLi[i].onmouseover=function()
		{
			for(var j=0;j<sidebarLeftLi.length;j++)
			{
				sidebarLeftContent[j].style.display="none";
				sidebarLeftLi[j].style.backgroundColor="#c23131";
				animate(sidebarLeftLiCon[j],{left:0},400,Tween.Linear);
			//sidebarLeftLiCon[j].style.cssText="position:relative;left:0px";
		}
		sidebarLeftContent[this.index].style.display="block";
		sidebarLeftLi[this.index].style.backgroundColor="#872222";
		//sidebarLeftLiCon[this.index].style.cssText="position:relative;left:10px";
		animate(sidebarLeftLiCon[this.index],{left:6},400,Tween.Linear);
	}
	sidebarLeftLi[i].onmouseout=function()
	{
		for(var i=0;i<sidebarLeftLi.length;i++)
		{
			sidebarLeftContent[i].style.display="none";
			sidebarLeftLi[i].style.backgroundColor="#c23131";
			//sidebarLeftLiCon[i].style.cssText="position:relative;left:0px";
			animate(sidebarLeftLiCon[i],{left:0},400,Tween.Linear);
		}
		
	}
}




/*今日必团 动效*/
var mainImg=$(".main-img");
var mainImgInner=$(".main-img-inner");
for(var i=0;i<mainImgInner.length;i++)
{
	mainImgInner[i].index=i;
	mainImgInner[i].onmouseover=function()
	{
		animate(mainImgInner[this.index],{left:5},200,Tween.Linear);
	}
	mainImgInner[i].onmouseout=function()
	{
		animate(mainImgInner[this.index],{left:10},200,Tween.Linear);
	}
}



/*闪购 特效*/
var conBottomDownbox=$(".con-bottom-downbox");
var conBottomUpLeftInner=$(".con-bottom-up-left-inner");
var conBottomUpLeftSanjiao=$(".con-bottom-up-left-sanjiao")[0];
var conBottomUpLeftInnerA=$(".con-bottom-up-left-inner-a");
var b=0;
conBottomDownbox[b].style.display="block";
conBottomUpLeftInnerA[b].style.color="#cea145";
function moveshangou()
{
	b++;
	if(b==3)
	{
		b=0;
	}
	for(var i=0;i<conBottomDownbox.length;i++)
	{
		conBottomDownbox[i].style.display="none";
		conBottomUpLeftInnerA[i].style.color="#666";
	}
	conBottomDownbox[b].style.display="block";
	conBottomUpLeftInnerA[b].style.color="#cea145";
	animate(conBottomUpLeftSanjiao,{left:68*b+30},600,Tween.Linear);
}
var tb=setInterval(moveshangou,4000);
for(var i=0;i<conBottomUpLeftInner.length;i++)
{
	conBottomUpLeftInner[i].index=i;
	conBottomUpLeftInner[i].onmouseover=function()
	{
		clearInterval(tb);
		for(var j=0;j<conBottomDownbox.length;j++)
		{
			conBottomDownbox[j].style.display="none";
			conBottomUpLeftInnerA[j].style.color="#666";
		}
		conBottomDownbox[this.index].style.display="block";
		conBottomUpLeftInnerA[this.index].style.color="#cea145";
		animate(conBottomUpLeftSanjiao,{left:68*(this.index)+30},600,Tween.Linear);
	}
	conBottomUpLeftInner[i].onmouseout=function()
	{
		b=this.index;
		tb=setInterval(moveshangou,4000);
	}
}


/*楼层图片闪光*/
var shanguang=$(".shanguang");
var sconAS=$(".scon-as");
for(var i=0;i<sconAS.length;i++)
{
	sconAS[i].index=i;
	sconAS[i].onmouseover=function()
	{

		shanguang[this.index].style.zIndex=5;
		animate(shanguang[this.index],{opacity:0},60);
	}
	sconAS[i].onmouseout=function()
	{
		for(var j=0;j<shanguang.length;j++)
		{
			shanguang[j].style.zIndex=3;
			shanguang[j].style.opacity=0.3;
		}
		
	}
}


/*7楼 左侧 图片 闪光*/
var conabLbliImg=$(".con-ab-lb-li-img");
for(var i=0;i<conabLbliImg.length;i++)
{
	conabLbliImg[i].index=i;
	conabLbliImg[i].onmouseover=function()
	{
		animate(conabLbliImg[this.index],{opacity:0.8},100,Tween.Linear,function(){
			animate(conabLbliImg[this.index],{opacity:1},60,Tween.Linear);
		})
	}
}
var conabLbliImga=$(".con-ab-lb-li-imga");
for(var i=0;i<conabLbliImga.length;i++)
{
	conabLbliImga[i].index=i;
	conabLbliImga[i].onmouseover=function()
	{
		animate(conabLbliImga[this.index],{opacity:0.8},60,Tween.Linear,function(){
			animate(conabLbliImga[this.index],{opacity:1},60,Tween.Linear);
		})
	}
}

/*内容1-8层 中间 大图 闪光 */

var conbShanguang=$(".con-b-shanguang");
for(var i=0;i<conbShanguang.length;i++)
{
	conbShanguang[i].index=i;
	conbShanguang[i].onmouseover=function()
	{
		animate(conbShanguang[this.index],{opacity:0.6},100,Tween.Linear,function(){
			//conbShanguang[this.index].style.opacity=1;
			animate(conbShanguang[this.index],{opacity:1},100,Tween.Linear);
		})
	}
	/*conbShanguang[i].onmouseout=function()
	{
		conbShanguang[this.index].style.opacity=1;
	}*/
}



/*顶部导航 右侧*/
var topnavMenuList=$(".topnav-menu-list");
var topnavInner=$(".topnav-inner");
for(var i=0;i<topnavMenuList.length;i++)
{
	topnavMenuList[i].index=i;
	topnavMenuList[i].onmouseover=function()
	{
		for(var j=0;j<topnavInner.length;j++)
		{
			topnavInner[j].style.display="none";
		}
		topnavInner[this.index].style.display="block";
	}
	topnavMenuList[i].onmouseout=function()
	{
		for(var j=0;j<topnavInner.length;j++)
		{
			topnavInner[j].style.display="none";
		}
	}
}


/*导航 微信*/
var topnavRightWeixinErji=$(".topnav-right-weixin-erji")[0];
var topnavRightWeixin=$(".topnav-right-weixin")[0];
topnavRightWeixin.onmouseover=function()
{
	topnavRightWeixinErji.style.display="block";
}
topnavRightWeixin.onmouseout=function()
{
	topnavRightWeixinErji.style.display="none";
}

/*导航 登录*/
var topnavLeftLeft=$(".topnav-left-left")[0];
var topnavLeftLeftErji=$(".topnav-left-left-erji")[0];
topnavLeftLeft.onmouseover=function()
{
	topnavLeftLeftErji.style.display="block";
}
topnavLeftLeft.onmouseout=function()
{
	topnavLeftLeftErji.style.display="none";
}

/*导航 送货*/
var topnavLeftRight=$(".topnav-left-right")[0];
var topnavLeftRightErjia=$(".topnav-left-right-erjia")[0];
var topnavLeftDizhi=$(".topnav-left-dizhi")[0];
topnavLeftRight.onmouseover=function()
{
	topnavLeftRightErjia.style.display="block";
	topnavLeftDizhi.style.backgroundImage="url(image/indexhead_sprite.png)";
	topnavLeftDizhi.style.backgroundPosition="right -79px";
}
topnavLeftRight.onmouseout=function()
{
	topnavLeftRightErjia.style.display="none";
	topnavLeftDizhi.style.backgroundImage="url(image/indexhead_sprite.png)";
	topnavLeftDizhi.style.backgroundPosition="right 7px";
}



/* 搜索 右侧 购物车 */
var sousuoRightGouwucheInner=$(".sousuo-right-gouwuche-inner")[0];
var sousuoRightGouwuche=$(".sousuo-right-gouwuche")[0];
sousuoRightGouwuche.onmouseover=function()
{
	sousuoRightGouwucheInner.style.display="block";
}
sousuoRightGouwuche.onmouseout=function()
{
	sousuoRightGouwucheInner.style.display="none";
}




/*搜索框*/
var text=$("#text");
var sousuoInputInner=$(".sousuo-input-inner")[0];
text.onfocus=function(){
	if(text.value=="请输入关键词")
	{
		text.value="";
	}
	sousuoInputInner.style.display="block";
}
text.onblur=function(){
	if(text.value=="")
	{
		text.value="请输入关键词";
	}
	sousuoInputInner.style.display="none";
}



/*  搜索框 左边 商品*/
var sousuoCenterShangpin=$(".sousuo-center-shangpin")[0];
var sousuoCenterShangpinInner=$(".sousuo-center-shangpin-inner")[0];
sousuoCenterShangpin.onmouseover=function()
{
	sousuoCenterShangpinInner.style.display="block";
}
sousuoCenterShangpin.onmouseout=function()
{
	sousuoCenterShangpinInner.style.display="none";
}


// 闪购
var conBottomTime=$(".con-bottom-time");
var conBottomTimeInner=$(".con-bottom-time-inner");
conBottomTime.onmouseover=function(){
	conBottomTimeInner.style.display="block";
}
conBottomTime.onmouseout=function(){
	conBottomTimeInner.style.display="none";
}


})