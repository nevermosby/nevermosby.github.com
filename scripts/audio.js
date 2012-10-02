
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var audio = new Audio();
   
    var songs = new Array( 
                            "没那么简单.mp3",
                            "leave out all the rest.mp3",
                             "笔记.mp3",
							 "the scientist.mp3",
							 "做你的男人"
                             //"浮夸.mp3",
                             //"老男孩.mp3"
                             //"那就这样吧.mp3"
                             );
    var songsurl = new Array(
                                "http://www.aaron.cn/mp3/mei-jiandan.mp3",
                                "http://stevenessani.com/leave.out.all.the.rest.mp3",
                                "http://zxdj.jnu.edu.cn/ystk/yinyue/%E7%AC%94%E8%AE%B0.mp3",
								"https://dl.dropbox.com/u/18794215/mp3/The%20Scientist.mp3",
								"http://zhangmenshiting2.baidu.com/data2/music/1169923/1169923.mp3"

    //"leave out all the rest.mp3", "笔记.mp3"
                                );
    var songdir = "mp3/";
    var songtmp = "";
    var sungsong = new Array(songs.length);

    for (var i = 0; i < songs.length; i++) {
        sungsong[i] = false;
    }

    var sungcount = 0;
    var second = 0;
    var time;

    //for nextsong()
    var randomnum;
    var alltrue = false;
   // var rest = true;


    //set second plus
    function timeCount() {
        //var st = document.getElementById("t1");
       // st.value=second;
        second = second + 1;
        time = setTimeout("timeCount()",1000);
    }
    //pause timeout
    function pauseCount() {
        clearTimeout(time);
    }


    //songs[0] = "";
    //var pause = document.getElementById("pause");
        function Song() {
        this.name = "";
        this.author = "";
    }
    var sg = new Song();

    
    function showNext(){

        //var next = document.getElementById("next");
        var before = document.getElementById("before");

        before.innerHTML= $("#next").offset().top+", "+$("#next").offset().height;

        // alert(next.style.top);
    }

	//judge useragent
	function getUseragent(){
	
	
		var ua =window.navigator.userAgent.toLowerCase();//windows.navigator.userAgent.toLowerCase();
		var uasp = document.getElementById("ua");
		if(ua.indexOf("msie")>=1)
		{
			uasp.innerHTML="你用的是IE吧,使用IE9浏览，效果最好哦~"
		}
		if(ua.indexOf("firefox")>=1)
		{
			uasp.innerHTML="不好意思,对FF支持还不完善，试试IE9或者chrome stable吧~"
		}
		if(ua.indexOf("chrome")>=1)
		{
			uasp.innerHTML="你用的是chrome吧，good choice~"
		}
		
		//$("#ua").innerHTML=ua;
		
	}

    $(document).ready(init);
    // window.onload = init();

    function display() {
   
        $("#next").next("em").animate({ opacity: "show", top: $("#next").offset().top-75 }, "slow");
    }

    function disappear() {
        $("#next").next("em").animate({ opacity: "hide", top: $("#next").offset().top-75 }, "fast");
    }
    function init() {

        //display();
        //showNext();
		getUseragent();
        setInterval(displayTime, 1000);
        playsongs();
        
    }
    function displayTime(){

        var time = document.getElementById("time");
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime / 60) % 60);
        time.innerHTML = m + '.' + s ;

        var duration = document.getElementById("duration");

        var dm = parseInt((audio.duration / 60) % 60);
        var ds = parseInt(parseInt(audio.duration) - dm * 60);
        duration.innerHTML = dm + ':' + ds;

        if (audio.ended) {
            alert("click to next song~");
            NextSong();
        }
        if (s == 10 || s==30 ) {
            display();
        }
        if (s == 15 || s== 35) {
            disappear();
        }
       //try to use the percentage of song
    }

    function playsongs() {

        //alert(songsurl.length);
       document.getElementById("songname").focus();
       document.getElementById("songname").select();

       //for audio to play the song
        var songurl = "";
        var randomsongnum = randomNum();
        //alert(randomsongnum);
        sungsong[randomsongnum] = true;
        pretoplay(randomsongnum);
      // songurl = songdir + songs[randomsongnum];
       //alert(songurl);
      // setsong(songurl);
        // songtmp = returnSongname(songs[randomsongnum]);
        alert("Start Now");

/*
        var a2 = new Audio();
        a2.setAttribute("src", "http://www.aaron.cn/mp3/mei-jiandan.mp3");
        a2.play();
*/
        timeCount();
        playp();

        

   }
   //papare a song to play
   function pretoplay(num) {

       songurl = songsurl[num];  //songdir + songs[num];
       //alert(num);
       setsong(songurl);
       songtmp = returnSongname(songs[num]);

   }
   //give a random number
   function randomNum() {
       return Math.floor(Math.random() * songs.length);
   }

    /*
    next songs to play\
    */
   function NextSong() {

       var rest = true;
       /*
        var randomnum;
        var alltrue = false;
        var rest = true;
        */
        if (alltrue) {


            pausep();

            alert("u have reached through the song list~~");
            //alert("you may click start to restart this game");
            //make it auto restart
            if (confirm("r u going to restart it and have another try?")) {

                for (var i = 0; i < sungsong.length; i++) {
                    sungsong[i] = false;
                }
                alltrue = false;

                restart();
            }
            else {
            //need to check 
                document.write("Thank u for playing, plz wait to play new mode~");
            }

        }
        
        
    //random out a fresh num
    do {
        randomnum = randomNum();
    }
    while (sungsong[randomnum]);

    sungsong[randomnum] = true;
    
    //判断是不是所有标记都是true了。

    for (var i in sungsong)
    {
       
       rest = rest && sungsong[i];

   }
  // alert(rest);
   alltrue = rest;
   //alert(alltrue);
    
    pretoplay(randomnum);
    playp();

    }

    function restart() {

       
        NextSong();

    }

    //validate the song
    function validate() {
        audio.pause();
        var usersong = document.getElementById("songname");
        //usersong.trim();
        //alert("user:" + usersong.value.trim() + ",thisSong: " + songtmp);
        var flag = false;

        if (usersong.value.trim() == songtmp) {
                sungcount++;
                alert("Correct,click the confirm to play the next song");
                if (sungcount != songsurl.length) {
                   
                    NextSong();
                } 
            }
            else {
                alert("Wrong");
                playp(); //audio.play();
               
            }
 
    }
    //watch the enter code
    function enterpress() {
        if (event.keyCode == 13) {
           
            validate();
           // alert("sungcount: " + sungcount);
            if (sungcount == songsurl.length) {
                alert("that is the last song.The end~");
                alert("you have consumed "+second+" second!");
                document.write("Thank u for playing, plz wait for us to play new mode~");
            }
           // else {
           //     validate();
           // }
            //alert("entered");
        }
    }
   // function setFocus
   //return the name of song only
    function returnSongname(extendedsong) {

       var retSong=
        extendedsong.substring(0, extendedsong.indexOf("."));
        return retSong;
    }
    function playp(){
        // alert("play");
       document.getElementById("songname").focus();
       document.getElementById("songname").select();
        audio.play();
    }

    function pausep() {
        //alert("pause");
        audio.pause();
    }

    function setsong(songurl) {
        //var aurl = document.getElementById("audiofile");
        audio.setAttribute("src", songurl);
    }

    function alertu() {

        window.open("http://weibo.com/robolwq");

    }