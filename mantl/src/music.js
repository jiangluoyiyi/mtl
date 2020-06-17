var mpath="https://api.imjad.cn/cloudmusic/?";
var plid=2829896389; //歌单id
var midlist=[];//记录歌单信息
var middata={};

function getUrlpid(name){
    let str=document.location;
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r=str.search.substr(1).match(reg);
    if(r!=null){
        plid=r[2];
    }
    console.log("歌单id:"+plid);
}
$("body").onload=getUrlpid("plid");
console.log(plid);
function getData(){//获取歌单内音乐id
    let url=mpath+"type=playlist&id="+plid;
    midlist=[];//清空
    console.log(url);
    $.get(url,function(data){
        //let mdataobj=JSON.parse(data);
        if(data.code==200){
            let tids=data.playlist.trackIds;
            for(let i=0;i<tids.length;i++){
                midlist.push(tids[i].id);
            }
            console.log("歌单数目："+midlist.length);
        }
    });
}
$("body").onload=getData();
function getmData(mid){//根据id获取音乐信息（封面、歌名和mp3)
    let url1=mpath+"type=detail&id="+mid;
    let url2=mpath+"type=song&id="+mid;
    $.get(url2,function(mdata){
        if(mdata.code==200){
            console.log(mdata);
            msrc=mdata.data[0].url;
            if(msrc==""){
                changeMusic();
            }
            $("#music").attr('src',msrc);
        }
    });
    $.get(url1,function(data){
        if(data.code==200){
            console.log(data);
            mcover=data.songs[0].al.picUrl;
            mname=data.songs[0].al.name;
            $(".logo").css('background-image','url("'+mcover+'")');
            $(".logo").attr('title',mname);
        }
    });
}

var indexid=0;
function changeMusic(){
    //随机播放
    indexid=Math.floor(Math.random()*midlist.length);
    //顺序播放
    /*
    indexid++;
    if(indexid>=midlist.length){
        indexid=0;
    }
    */
   console.log("第"+indexid+"首");
    getmData(midlist[indexid]);
}

var anim=document.getElementById("animplay");
var music=document.getElementById("music");
var pausem=document.getElementById("pausem");
var clicknum=1;
var mcover1;
var msrc1;
function animclick(){//播放
    music.volume=0.3;
    anim.style.backgroundImage=mcover1;
    if(clicknum==1){
        changeMusic();
    }
    clicknum=1;
    music.play();
    anim.style.animation="anim 5s linear 0s infinite none";
    pausem.style.display="block";
}
function pauseclick(){//暂停
    clicknum=0;
    mcover1=anim.style.backgroundImage;
    music.pause();
    anim.style.animation="none";
    pausem.style.display="none";
    anim.style.backgroundImage="url('res/漫陀罗logo.png')";
}
setInterval(function(){//音乐播放完毕自动切换下一首
    if(music.ended){
        changeMusic();
     }
},1000);

function yyMusic(){
    if(music.paused){
        animclick();
    }
}

//顶部背景图片
