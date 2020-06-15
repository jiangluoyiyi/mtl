var path="https://api.pingcc.cn/?";//接口地址
var ypath="https://v1.hitokoto.cn/?c=a&c=b&c=c&encode=json&charset=utf-8";
var isyy=false;
var main=document.getElementById("main");
var fenl=document.getElementById("fenl");
var paih=document.getElementById("paih");
var yiyan=document.getElementById("yiyan");

//首页
function syData(){
    main.innerHTML="首页✧";
    fenl.innerHTML="分类";
    paih.innerHTML="排行";
    yiyan.innerHTML="一言";
    isyy=false;
    let svalue=$("#search").val();
    let url=path+"mhname="+svalue;
    viewData(url,svalue,0);
}

var nowpagevalue;
var maxpagevalue;
var flName="";
function viewData(url,svalue,ind){
    let targetnum=0;
    console.log(url);
    $.get(url,function(data){
        let dataObj=JSON.parse(data);
        let showdata="";
        let showdata1="";
        console.log(dataObj);
        console.log(flName);
        if(dataObj.code==1){
            alert("请求数据错误");
        }else{
            $("#content").empty();
            nowpagevalue=dataObj.list[0].pages;
            maxpagevalue=dataObj.list[0].dpages;
            $("#content").append('<div onclick="flView()" title="返回分类" style="-webkit-user-select:none;color:#CCCCCC;border:none;width:200px;hright:50px;line-height:50px;float:left;font-size:20px;font-weight:bolder;outline:none;position:relative;background-color:none;">'+flName+'»</div>'+
                                    '<div class="pages" style="width:700px;height:50px;margin:0 atuo;line-height: 50px;text-align: center;">'+
                                    '<input id="dpage" type="button" value="上一页" onclick="flPages(\'sub\','+ nowpagevalue+','+maxpagevalue+')">'+
                                    '第 <input id="npage" type="text" value="'+ dataObj.list[0].pages+'" style="width:50px;text-align: center;"> /'+
                                    '<input id="tpages" type="text" value="'+ dataObj.list[0].dpages+'" style="width:50px;text-align: center;border: none;" readonly>页'+
                                    '<input id="apage" type="button" value="下一页" onclick="flPages(\'add\','+ nowpagevalue+','+maxpagevalue+')">'+'<del><input id="cpage" type="button" value="跳转" onclick="flPagesJ(\''+maxpagevalue+'\')"></del>'+
                                '</div>'+
                                '<hr>'
                                    );
            if(ind==0||ind==3){
                $("#content").empty();
            }
            $("#content").append("<div class='box' style='width:580px; min-height: 768px; margin: 0 auto;'></div>")
            for(let i=ind%2;i<dataObj.list.length;i++){
                if(dataObj.list[i].name.search(svalue)!=-1){
                   targetnum++;
                   showdata1+='<div class="mh"  onclick="xqData(this,\'\')" style="margin-left:15px;margin-top:30px;width:100px;height:150px;overflow: hidden;float: left;" title='+dataObj.list[i].name+'>'+
                   //'<div class="mhcover" style="background-image: url('+dataObj.list[i].cover+');"></div>'+
                   '<img class="mhcover" src="'+dataObj.list[i].cover+'"></img>'+
                   '<div class="mhname">'+dataObj.list[i].name+'</div>'+
                   '<div class="mhstatus" style="float: right;">'+dataObj.list[i].status+'</div>'+
                   '<input class="mhurl1" type="text" value="'+dataObj.list[i].url+'"></div>'
                }
                showdata+='<div class="mh"  onclick="xqData(this)" style="margin-left:15px;margin-top:30px;width:100px;height:150px;overflow: hidden;float: left;" title='+dataObj.list[i].name+'>'+
                '<div class="mhcover" name="'+dataObj.list[i].cover+'" style="background-image: url('+dataObj.list[i].cover+');"></div>'+
                '<div class="mhname">'+dataObj.list[i].name+'</div>'+
                '<div class="mhstatus" style="float: right;">'+dataObj.list[i].status+'</div>'+
                '<input class="mhurl1" type="text" value="'+dataObj.list[i].url+'"></div>'
            }
            if(targetnum==0){
                $(".box").append("<div style='width:100%;height:80px;line-height:80px;text-align:center;color:#CCCCCC;opacity: 0.5;'>未找到你想要的漫画</div><hr>");
                $(".box").append(showdata);
            }else{
                $(".box").append(showdata1);
            }
            $("#search").val("");
        }
    });
}
$("#btnsearch").click(syData);
 
 //详情
function xqData(obj,mess){
    let url=path+"mhurl1="+obj.lastChild.value;
    console.log(url);
    $.get(url,function(data){
        let dataObj=JSON.parse(data);
        //let cover=dataObj.data.cover.replace(/http:https/,"https")
        let cover="";
        if(mess=="ph"){
            cover=obj.children[1].firstElementChild.src;
        }else{
            cover=obj.firstElementChild.src;
        }
        console.log(cover);
        console.log(dataObj);
        if(dataObj.message=="成功!"){
            let name=dataObj.data.name;
            let time=dataObj.data.time;
            let status=dataObj.data.status;
            let tag=dataObj.data.tag;
            let author=dataObj.data.author;
            let intr=dataObj.data.introduce;
            console.log(dataObj);
            console.log(cover);
            let showdata="";
            if(dataObj.code==1){
                alert("请求数据错误");
            }else{
                $("#content").empty();
                $("#content").append(' <div class="mhxq" style="min-height:768px; margin-top: 20px;margin-left: 20px;"></div>');
                $(".mhxq").append('<div class="mhcover" style="width:150px; height:225px;background-image: url(\''+cover+'\');"></div>'+
                                    '<div class="mhname" style="width:600px;margin-left:20px;font-size: 25px;font-weight: 800;">'+name+'</div>'+
                                    '<div style="width:600px;float:left;margin-left:20px;font-size:17px;">'+
                                        '<span class="mhname" style="width:150px;">'+tag+'</span>'+
                                        '<span style="color:#cccccc;margin-left:20px;">'+time+'</span>'+
                                        '<span class="mhstatus">'+status+'</span>'+
                                        '<span style="float:right;margin-right:10px;">作者:'+author+'</span>'+
                                    '</div>'+
                                    '<div style="height:140px;width:650px;float:left;margin-left:20px;font-size:17px;margin-top:10px;"><hr>'+
                                    '<span class="intr" style="display:block;width:100%;height:130px;overflow-y:scroll;color:#5a5959">'+
                                        intr+
                                    '</span><hr>'+  
                                    '</div>'+
                                    '<div class="mhlist" style="width:860px;min-height:600px;margin-top:30px;float: left;"></div>'
                                    );
                for(let i=0;i<dataObj.list.length;i++){
                    showdata+='<div onclick="getUrl2(this)" class="mhname jishu"  title="'+dataObj.list[i].num+'">'+dataObj.list[i].num+
                                '<input style=";" type="text" value="'+dataObj.list[i].url+'">'+
                                '</div>'
                }
                $(".mhlist").append(showdata);
            }
        }
        else{
            alert("未获取到数据");
        }
        
    });
}
function getUrl2(obj){
    obj.style.background="#CCCCCC";
    obj.style.color="#FFF";
    obj.style.border="#999999 solid";
    let url2=obj.lastChild.value;
    console.log(url2);
    window.open("src/reading.html?mhurl2="+ url2);
}

//阅读
function readMh(){
    let str=document.location.toString();
    let urlarr=str.split("?")[1];
    let url=path+urlarr;
    //let url=path+"mhurl2="+url2;
    console.log(url);
    $.get(url,function(data){
        let dataObj=JSON.parse(data);
        console.log(dataObj);
        if(dataObj.code==1){
            alert("请求数据失败");
        }
        else{
            $(".reading").empty();
            for(let i=0;i<dataObj.list.length;i++){
                $(".reading").append(' <img src="'+dataObj.list[i].img+'" alt="" width="800" style="margin:0 auto;">');
            }
        }
    });
}
document.getElementsByClassName("reading").onload=readMh();

//分类界面
function flView(){
    main.innerHTML="首页";
    fenl.innerHTML="分类✧";
    paih.innerHTML="排行";
    yiyan.innerHTML="一言";
    isyy=false;
    $("#content").empty();
    $("#content").append('<div class="flbox" style="width:100%;min-height:768px;margin:0 auto;"></div>');
    var namearr=new Array("少年热血","武侠格斗","恐怖灵异","耽美人生","少女爱情","恋爱生活","生活漫画","科幻魔幻","竞技体育","爆笑喜剧","侦探推理","大陆漫画","日本漫画","韩国漫画","香港漫画","台湾漫画","欧美漫画","其他");
    var valuearr=new Array("shaonianrexue","wuxiagedou","kongbulingyi","danmeirensheng","shaonvaiqing","lianaishenghuo","shenghuomanhua","kehuanmohuan","jingjitiyu","baoxiaoxiju","zhentantuili","dalu","riben",
    "hanguo","xianggang","taiwan","oumei","qita");
    console.log(namearr.length);
    console.log(valuearr.length);
    for(let i=0;i<namearr.length;i++){
        $(".flbox").append('<div class="flitem" style="margin-left:25px;margin-top:30px;box-shadow: #949393 5px 5px;float:left;" onclick="flData(this,1)">'+
                            '<div class="title" value="'+valuearr[i]+'" style="height:40px;line-height: 40px;border-radius: 10px 10px 0 0;-webkit-user-select:none;">'+
                            namearr[i]+
                            '</div>'+
                            '<img src="./res/漫.png" alt="" width="140" style="margin-top:15px;">'+
                            '</div>');
    }
}
var pageurl="";
//分类
function flData(obj,page){
    let url3=obj.firstChild.getAttribute("value");
    flName=obj.firstChild.innerHTML;
    console.log(url3);
    let url=path+"mhlb="+url3+"-"+page;
    pageurl=url3;
    viewData(url,"",1);
}
//页
function flPages(control,nowpage,maxpage){
    console.log(pageurl);
    if(control=="add"){
        if(nowpage>=maxpage){
            alert("已是尾页");
        }else{
            nowpage++;
        }
    }if(control=="sub"){
        if(nowpage==1){
            alert("已是首页");
        }else{
            nowpage--;
        }
    }
    let url=path+"mhlb="+pageurl+"-"+nowpage;
    viewData(url,"",1);
}
function flPagesJ(maxpage){
    let nowpage=document.getElementById('npage').value;
    console.log(nowpage,maxpage);
    if(nowpage<1||nowpage>maxpage){
        alert("超出范围");
    }else{
        let url=path+"mhlb="+pageurl+"-"+nowpage;
        viewData(url,"",1);
    }
}
var randnum=Math.ceil(Math.random()*20);
console.log("随机数:"+randnum);
//排行
function phData(){
    main.innerHTML="首页";
    fenl.innerHTML="分类";
    paih.innerHTML="排行✧";
    yiyan.innerHTML="一言";
    isyy=false;

    let url=path+"mhlb=hot-"+randnum;
    $.get(url,function(data){
        let dataObj=JSON.parse(data);
        let numcolor="";
        console.log(dataObj);
        $("#content").empty();
        $("#content").append('<div class="paihang" style="min-height:768px;"></div>');
        for(let i=1;i<dataObj.list.length;i++){
            numcolor="";
            if(i==1){
                numcolor="#FF6666";
            }if(i==2){
                numcolor="#FF9966";
            }if(i==3){
                numcolor="#FFCCCC";
            }
            console.log(numcolor);
            $(".paihang").append(' <div class="phitem" onclick="xqData(this,\'ph\')">'+
                                    '<div class="phnum" style="background-color:'+numcolor+';">'+i+'</div>'+
                                    '<div style="border:#CCCCCC solid; height:100%;width:600px;float:left;margin-left:20px;">'+
                                        '<img class="phfm" src="'+dataObj.list[i].cover+'">'+
                                        '<div class="mhname" style="width:400px;font-size:20px;font-weight: bolder;margin-top:15px;">《'+dataObj.list[i].name+'》'+
                                            '<span style="font-size:15px;color:#CCCCCC;font-weight: normal;">'+dataObj.list[i].time+'</span>'+
                                        '</div>'+
                                        '<div class="mhname phjs">'+dataObj.list[i].latest+'</div>'+
                                    '</div>'+
                                    '<input type="text" style="display:none;" value="'+dataObj.list[i].url+'"/>'+
                                '</div>');
        }
    });
}

//一言
function yyData(){
    isyy=true;
    main.innerHTML="首页";
    fenl.innerHTML="分类";
    paih.innerHTML="排行";
    yiyan.innerHTML="一言✧";
    getyy();
}
function getyy(){
        $.get(ypath,function(data){
            console.log(data);
            $("#content").empty();
            $("#content").append('<div class="box" style="width:100%;min-height:780px;">'+
                                '<div class="yyan" style="border:solid;width:auto;height:auto;min-height:200px;max-height:500px;float:right;margin-right:100px;margin-top:100px;padding:15px;writing-mode: tb-rl;font-size: 20px;font-weight: bolder;">'+
                                    '<span class="text" style="width:100px;height:400px;line-height: 50px;text-indent: 2em;">『'+
                                        data.hitokoto+
                                    '』</span><br>'+
                                    '<span class="from" style="width:40px;height:250px;margin-right:30px;font-size:18px;-webkit-text-stroke: 0.5px black;-webkit-text-fill-color: transparent;"> ——'+
                                        data.from+
                                    '</span></div></div>');
        });
}
setInterval(function(){
    if(isyy){
        getyy();
    }
},5000);
