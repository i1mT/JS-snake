var mapHeight=20;//地图高
var mapWidth=20;//地图宽
var snakeX = [400];//第i节的X坐标
var snakeY = [400];//第i节的y坐标
var snakeAtt = [400];//第i节的
var foodX=4,foodY=7,preFoodX=4,preFoodY=7;
var score=3;//蛇的节数  最终得分等于该值-3
var direct=4;//1-上 2-下 3-左 4-右
var tailX=0,tailY=0;//用于将上一次的尾巴颜色清空
var speed=200;//毫秒
var timer;//定时器
var time=0;
var rankList = new Array;
var rankScore = document.getElementsByTagName("h2");
var moveTime = 0;

function makeMap(){//创建地图
    var html = [];
    html.push("<table>"); 
    for (var y = 0; y < mapHeight; y++) { 
        html.push("<tr>"); 
        for (var x = 0; x < mapWidth; x++) { 
            html.push('<td id="box_' + x + "_" + y + '"> </td>'); 
        } 
        html.push("</tr>");
    }
    html.push("</table>"); 
    document.write(html.join(""));
}

function init(){//初始化
    //记录目前的排行榜分数
    for (var k = 0; k < rankScore.length; k++){
        rankList.push(parseInt(rankScore[k].innerHTML));
        console.log(rankList[k]);
    }
    //清除地图
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            document.getElementById("box_"+i+'_'+j).style.background="#fff";
        }
    }
    //初始化蛇
    snakeX[0] = 7,snakeY[0] = 9,snakeAtt[0] = 1;//身体
    snakeX[1] = 8,snakeY[1] = 9,snakeAtt[1] = 1;//身体
    snakeX[2] = 9,snakeY[2] = 9,snakeAtt[2] = 0;//头
    score = 3;//初始化分数
    direct = 4;//初始化方向
    makeFood();
}

function makeFood(){
    var xx,yy;
    xx = parseInt(Math.random()*19);
    yy = parseInt(Math.random()*19);
    while(checkFood(xx,yy)){
        xx = parseInt(Math.random()*19);
        yy = parseInt(Math.random()*19);
    }
    foodX = xx;
    foodY = yy;
    var ele = document.getElementById("box_"+foodX+'_'+foodY);
    ele.style.background = "rgb(50,230,166)";//食物
}

function checkFood(x,y){
    for(var i=0;i<score;i++){
        if(x==snakeX[i]&&y==snakeY[i])return 1;
    }
    if((x==0&&y==0)||(x==19&&y==0)||(x==0&&y==19)||(x==19&&y==19)||x<=0||y<=0||x>19||y>19) return 1;
    return 0;
}


function move(){
    var x = snakeX[score-1],y = snakeY[score-1];//保存原来的头地址用于后面的交换
    switch(direct){
        case 1://上
            snakeY[score-1]--;
            break;
        case 2://下
            snakeY[score-1]++;
            break;
        case 3://左
            snakeX[score-1]--;
            break;
        case 4://右
            snakeX[score-1]++;
            break;
    }
    if (ifHit()){
        clearInterval(timer);
        var commont,val=score-3,state=-1;
        if(val<5){
            commont = "菜逼，别给爸爸丢人了！(￢_￢)";
        }else if(val<15){
            commont = "哎哟不错呢~";
        }else if(val<30){
            commont = "厉害了Word哥!";
        }else if(val<45){
            commont = "在下佩服，是在是牛!!"
        }else if(val<75){
            commont = "超神了我的哥~";
        }else{
        	commont = "最牛逼，没有之一！！！"
        }
        /*for (var i = rankList.length-1; i>=0; i--) {
            if(val>rankList[i]){
                state=i;
            }
        }
        if(state!=-1){
            rankScore[state].innerHTML = val;
            alert("牛的一逼!!上榜啦~\n"+"得分:"+(score-3)+" \n"+"你是榜上第"+state+"名");
        }else{
            
        }*/
        alert("得分:"+(score-3)+" \n"+commont);
        init();
        document.getElementById('score').value = 0;
        showView();
        time = 0;
        return 0;
    }
    tailX=snakeX[0],tailY=snakeY[0];
    for(var i = score-2; i>=0; i--){
        var temp;
        temp = x,x = snakeX[i],snakeX[i] = temp; 
        temp = y,y = snakeY[i],snakeY[i] = temp;
    }
    if(snakeX[score-1]==foodX&&snakeY[score-1]==foodY){//吃到食物
        for (var i = score; i > 0; i--) {
            snakeX[i] = snakeX[i-1];
            snakeY[i] = snakeY[i-1];
        }
        snakeX[0]=foodX,snakeY[0]=foodY;
        score++;
        document.getElementById('score').value = score-3;
        makeFood();
    }
}

function rank(num){
    if(num>1){
        var o=1;
    }
}

function ifHit(){//判断撞墙或者撞自己
    if(snakeX[score-1]<0||snakeY[score-1]<0||snakeX[score-1]>19||snakeY[score-1]>19||ifBump()){
        return 1;
    }
    return 0;
}

function ifBump(){//撞自己
    for (var i = 0; i < score-1; i++) {
        if(snakeX[score-1]==snakeX[i]&&snakeY[score-1]==snakeY[i]) return 1;
    }
    return 0;
}

function showView(){//生成视图--将坐标所对应的方格颜色换掉
    ele = document.getElementById("box_"+tailX+'_'+tailY);
    ele.style.background="#fff";//清除移动之后的尾巴
    var ele;
    for(var i=0;i<score-1;i++){
        ele = document.getElementById("box_"+snakeX[i]+'_'+snakeY[i]);
        ele.style.background="#888";
    }
    ele = document.getElementById("box_"+snakeX[score-1]+'_'+snakeY[score-1]).style.background="#111";
}

function run(){
	if(timer){
		clearInterval(timer);
	}
    timer = setInterval(
        function(){
            move();
            moveTime++;
            showView();
            time+=0.05;
            if(time>=10&&time%10==0){
                speed=speed*0.9;
            }
        }
    ,speed);
}

document.onkeydown=function(event){ 
e = event ? event :(window.event ? window.event : null); 
switch(e.keyCode){
        //上
        case 38: case 87:
            if(direct!=2&&moveTime!=0){
            	moveTime = 0;
            	direct=1;
            }
            break;
        //2-下
        case 40: case 83:
            if(direct!=1&&moveTime!=0){
            	moveTime = 0;
            	direct=2;
            }
            break;
        //左
        case 37: case 65:
            if(direct!=4&&moveTime!=0){
            	moveTime = 0;
            	direct=3;
            }
            break;
        //右
        case 39: case 68:
            if(direct!=3&&moveTime!=0){
            	moveTime = 0;
            	direct=4;
            }
            break;
    }
} 

function getTouch(num){
    var number = parseInt(num);
    switch(number){
        //上
        case 38: case 87:
            if(direct!=2&&moveTime!=0){
            	moveTime = 0;
            	direct=1;
            }
            break;
        //2-下
        case 40: case 83:
            if(direct!=1&&moveTime!=0){
            	moveTime = 0;
            	direct=2;
            }
            break;
        //左
        case 37: case 65:
            if(direct!=4&&moveTime!=0){
            	moveTime = 0;
            	direct=3;
            }
            break;
        //右
        case 39: case 68:
            if(direct!=3&&moveTime!=0){
            	moveTime = 0;
            	direct=4;
            }
            break;
    }
}