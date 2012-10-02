var $window=$(window),gardenCtx,gardenCanvas,$garden,garden;
$(function()
{
	$loveHeart=$("#loveHeart");
	var a=$loveHeart.width()/2;
	var b=$loveHeart.height()/2-55;
	$garden=$("#garden");
	gardenCanvas=$garden[0];
	gardenCanvas.width=$("#loveHeart").width();
	gardenCanvas.height=$("#loveHeart").height();
	gardenCtx=gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation="lighter";
	garden=new Garden(gardenCtx,gardenCanvas);
	$("#content").css("width",$loveHeart.width()+$("#code").width());
	$("#content").css("height",Math.max($loveHeart.height(),$("#code").height()));
	$("#content").css("margin-top",Math.max(($window.height()-$("#content").height())/2,10));
	$("#content").css("margin-left",Math.max(($window.width()-$("#content").width())/2,10));
	setInterval(function(){garden.render()},Garden.options.growSpeed)
});
	$(window).resize(function(){location.replace(location)});
	function getHeartPoint(c)
	{
		var b=c/Math.PI;
		var a=19.5*(16*Math.pow(Math.sin(b),3));
		var d=-20*(13*Math.cos(b)-5*Math.cos(2*b)-2*Math.cos(3*b)-Math.cos(4*b));
		return new Array(offsetX+a,offsetY+d)
	}
	function startHeartAnimation()
	{
		var c=50;
		var d=10;
		var b=new Array();
		var a=setInterval(function()
						 {
							var h=getHeartPoint(d);
							var e=true;
							for(var f=0;f<b.length;f++)
							{
								var g=b[f];
								var j=Math.sqrt(Math.pow(g[0]-h[0],2)+Math.pow(g[1]-h[1],2));
								if(j<Garden.options.bloomRadius.max*1.3)
									{
										e=false;
										break
									}
							}
							if(e)
							{
								b.push(h);
								garden.createRandomBloom(h[0],h[1])
							}
							if(d>=30)
							{
								clearInterval(a);
								showMessages()
							}
							else
							{
								d+=0.2
							}
						},c)
	}
	(	function($)
		//扩展jQuery的函数，即$("id").youraddfunction();
		{
			//jQuery.fn = jQuery.prototype
			//the following code is add function-- typewriter
			$.fn.typewriter=function(callback)
				{
					//each（）对于每个匹配元素都要执行的函数
					//匹配条件是什么？
					//这里的this是jQuery的还是Dom的？	
					//应该是指每个div下的元素					
					this.each(function()
					{
						var d=$(this),
						c=d.html(),
						// '<span class=\"d3\">Dear Yi,<br/>Since we met, it\'s been <br/></span><span id=\"metdays\" class=\"dayD3\"></span><span class=\"d3\"><br/>Days.<br/>I am always ur only -1~<br/></span><span id=\"video100\"></span>',
				
						b=0;
						//d is the div named by id
						//c is the first element in d
							//restore element in div
						//document.writeln("d in each func:"+d);
						//document.writeln("c in each function:"+c);
						//clear the div
                        //console.log(c);
						d.html("");
						var e=setInterval(function()
											{
												//js:substr(start,length)
												var f=c.substr(b,1);
												//document.writeln("f:"+f);
												if(f=="<")
												{
													b=c.indexOf(">",b)+1
												}
												else
												{
													b++
												}
												//js:substring(start,stop)
												//b&1，位And运算，每隔一个显示。
								d.html(c.substring(0,b));
								//+(b&1?"<span class=d3>_</span":""));
												if(b>=c.length)
												{
													clearInterval(e);
													callback();
												}
											},75)
					});
					return this;
				}
		}
	)(jQuery);
	
	
	function timeElapse(c)
	{
	var e=Date();
	var f=(Date.parse(e)-Date.parse(c))/1000;
	var g=Math.floor(f/(3600*24));
	f=f%(3600*24);
	var b=Math.floor(f/3600);
	if(b<10){b="0"+b}f=f%3600;
	var d=Math.floor(f/60);
	if(d<10){d="0"+d}f=f%60;if(f<10){f="0"+f}
	var a='<span id ="days" class="digit">'+g+'</span> days <span class="digit">'+b+'</span> hours <span class="digit">'+d+'</span> minutes <span class="digit">'+f+"</span> seconds";
	$("#elapseClock").html(a);
	//alert($("#days").val());
//    //fireout
//	if (Math.abs(g - 100) < 15)
//	    onFire();
//        
	}

    //for the time countdown of meeting
	function metTimeElapse(met) {

	    var now = Date();
	    var s = (Date.parse(now) - Date.parse(met)) / 1000;
	    var d = Math.floor(s / (3600 * 24));

	    //var days = '<span>' + d + '</span>';
	    $("#metdays").html(d);

    }


	//called by startHeartAnimation
	//after the HeartAnimation
	function showMessages()
	{
		adjustWordsPosition();
		$("#messages").fadeIn(3000,function()
			{
				showLoveU(imgSlider);
			});
		//$("#messages").addClass("d3");
	}
	
	function adjustWordsPosition()
	{
		$("#words").css("position","absolute");
		$("#words").css("top",$("#garden").position().top+195);
		$("#words").css("left",$("#garden").position().left+70)
	}
	function adjustCodePosition()
	{
		$("#code").css("margin-top",($("#garden").height()-$("#code").height())/2)
	}
	function showLoveU(callback)
	{
		$("#loveu").fadeIn(2000,callback);
		//callback();
	}
	
	
	//judge useragent
	function getUseragent(){
	
	
		var ua =window.navigator.userAgent.toLowerCase();//windows.navigator.userAgent.toLowerCase();
		var uasp = document.getElementById("ua");
		if(ua.indexOf("msie")>=1)
		{
			uasp.innerHTML="你用的是IE吧,目前IE还看不到绚丽的效果哦，赶快获得最主流的浏览器吧~";
			var createDiv = document.createElement("div");
			createDiv.innerHTML ="<a href=&quot;http://www.google.com/chrome/&quot;>click me</a>";
			uasp.appendChild(createDiv);
		}
		if(ua.indexOf("firefox")>=1)
		{
			if(ua.indexOf("10")>=1)
			{
				uasp.innerHTML=
				"WOW，您是FF10的使用者，good choice";
			}
			else{
				uasp.innerHTML="你用是FF的旧版本，请升级最新版，获得最佳体验哦～";
			}
		}
		if(ua.indexOf("chrome")>=1)
		{
			uasp.innerHTML="你用的是chrome吧，good choice~";
		}

		$("#ua").fadeOut(5000);

}


//fire out the firework
function onFire() {


    //big circle
    var big = setInterval('createFirework(99, 150, 8, 7, null, null, null, null, false, true)', 1500);
    //central
    var central = setInterval('createFirework(25, 187, 5, 1, null, null, null, null, false, true)', 1000);
    //standard
    var standard = setInterval('createFirework(11, 30, 3, 4, null, null, null, null, false, true)', 2000);

    setTimeout(function () {
        clearInterval(big);
        clearInterval(central);
        clearInterval(standard);
    }, 15000);
}

//image view function
function imgSlider()
{
	var words = $('#words');
	var roseDiv = $('#code');
	var roseCanvas = $('#rose');
	//make this image silder on the place of heartgarden
	//first, make garden canvas hidden
	console.log('enter imgSlider');
	// $('#garden').animate({
	// 		display: none	
	// 	},500,function()
	// {
	// 	console.log('completed hide');
	// });
	$('#garden').fadeOut(500,function(){
		$('#loveu').fadeOut(500);
		console.log('completed hide');
		words.animate({

			'top':'-=230px'
		},2000,'swing',function(){

			console.log('word top done');
			//rose fade out
			//TODO: come to center then fade out
			roseDiv.animate({
				//no effect show
				//maybe canvas problem
				'left':'+=100px'
			},1500,'swing',function(){

				console.log('completed center rose');
				// change the content of #garden for the anniversary of fall-in-love day.
				var fdays = $('#days').html(); 
				console.log('fall-in-love days: ' + fdays);
				if(fdays%365==0)
				{
					$(this).fadeOut(2500, function(){
						// change the content
						var html = '<span class=\"anni3\">Today is our anniversary, let us recall the good times~<br/></span>';
                		console.log("anniversary html: " + html);
						$('#loveu').html(html);
						$('#loveu').fadeIn(1500, function()
							{
								onFire();
								showIframe();
							});
					});
				}
				else
				{
					$(this).fadeOut(1500,function(){
						showIframe();
					});

				}
				// iframeDiv.css("position","absolute");
				// iframeDiv.css("top",words.position().top+words.height()+10);
				// iframeDiv.css("left",words.position().left-(ifWidth)/2)
				// iframeDiv.fadeIn(2500);
			});

			//just fade out
			// $('#code').fadeOut(1000,function(){

			// //make image slider
			// iframeDiv.css("position","absolute");
			// iframeDiv.css("top",words.position().top+words.height()+10);
			// iframeDiv.css("left",words.position().left-(ifWidth)/2)
			// iframeDiv.fadeIn(1000);
			// });			
			//bind keyboard
			
		});
	});
}

function showIframe()
{
	var words = $('#words');
	var iframeDiv = $('#ifDiv');
	var ifWidth = iframeDiv.width();
	iframeDiv.css("position","absolute");
	iframeDiv.css("top",words.position().top+words.height()+10);
	iframeDiv.css("left",words.position().left-(ifWidth)/2)
	iframeDiv.fadeIn(1500);
}

//function bindKeyBoard()
	