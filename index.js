var arr=[];
var colorCode=new Map();
colorCode.set(0,"green");
colorCode.set(1,"red");
colorCode.set(2,"yellow");
colorCode.set(3,"blue");
function chooseNext() {
    var numb=Math.floor(Math.random()*4);
    arr.push(colorCode.get(numb));
    $("#"+arr.at(-1)).fadeOut(10).fadeIn(10);
    sound(colorCode.get(numb));
}
function sound(id) {
    var snd=new Audio("./sounds/"+id+".mp3");
    snd.play();
}
var userLog=[];
function userInpt() {
    var box=this.id;
    sound(this.id);
    userLog.push(this.id);
    $("."+box).addClass("pressed");
    setTimeout(function(){$("."+box).removeClass("pressed");},100);
    setTimeout(ply,500);
}
var inGame=0;
var lvl;
var numberOfPress=0;
$(document).keypress(game)
function game()
{
    if (!inGame) {
        inGame=1;
        lvl=0;
        $("h1").text("level "+lvl);
        setTimeout(chooseNext(),100);
    }
}
function ply(){
    if(userLog[numberOfPress]===arr[numberOfPress]){
        if(numberOfPress===lvl){
            lvl++;
            $("h1").text("level "+lvl);
            chooseNext();
            userLog=[];
            numberOfPress=0;
        }
        else{
            numberOfPress++;
        }
    }
    else{
        inGame=0;
        arr=[];
        userLog=[];
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");sound("wrong");},200);
        lvl=0;
        numberOfPress=0;
        $("h1").text("Game over, press any key to continue");
    }
}
$(".btn").click(userInpt);