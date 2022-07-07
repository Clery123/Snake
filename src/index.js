class Snecc
{
    constructor()
    {
        this.head ={
            x: 20,
            y:20,
            direct: "right"
        };
        this.snake=[this.head];
    }

    draw(ctx)
    {
        ctx.fillStyle = '#464748';
        this.moveHead();
        this.levelSwap(level%3);
        ///Moving 
        ctx.clearRect(this.snake[this.snake.length-1].x-0.1, this.snake[this.snake.length-1].y-0.1, 20, 20);
        this.moveBody();
        
        if(numOfFoods >0){
            for(let x =0;x<numOfFoods;x++){
                if(this.head.x == mArray[x].xCFood && this.head.y == mArray[x].yCFood ){
                    this.addBody();
                    mArray.splice(x,1);
                    numOfFoods--;
                }
            }
        }
        if(this.head.x == xFood && this.head.y == yFood ){
            this.addBody();
            this.generateBall();
        }
        ctx.fillRect(this.head.x,this.head.y,20,20);
        this.colisionDetection();
        fired = true;
    }
    moveBody(){
        let x= this.head.x;
        let y = this.head.y;
        let dir = this.head.direct;
        const newSnake = [{ x,y,dir}];
        const snakeLength = this.snake.length;
        xGrid.fill(0);
        yGrid.fill(0);
        for (let i = 1; i < snakeLength; ++i) {
            newSnake.push({ ...this.snake[i - 1] });
            xGrid[this.snake[i-1].x/20]=1;
            yGrid[this.snake[i-1].y/20]=1;
        }
        this.snake = newSnake;
    }
    moveHead(){
        if(direction == "right"){
            this.head.x +=20;
            this.head.direct ="right";
        }
        else if(direction == "left"){
            this.head.x -=20;
            this.head.direct ="left";    
        }
        else if(direction =="down"){
            this.head.y +=20;
            this.head.direct ="down";
        }
        else if(direction =="up"){
            this.head.y -=20;
            this.head.direct ="up";
        }
    }
    generateBall(){
        xFood = Math.floor((Math.random() * 40))*20;
        yFood = Math.floor((Math.random() * 30))*20;
        for(var f = 0;f<1;f++){
            if(xGrid[xFood/20] == 1 && yGrid[yFood/20]==1)
            {
                f=0;
                xFood = Math.floor((Math.random() * 40))*20;
                yFood = Math.floor((Math.random() * 30))*20;
            }
        }
        
    }
    levelSwap(ctx, lvl){
        if(lvl == 0){
            document.getElementById("myCanvas").style.border = "8px solid #454647";
        }
        else if(lvl ==1)
            document.getElementById("myCanvas").style.border = "2px solid white";
        else if(lvl ==2){
            document.getElementById("myCanvas").style.border = "4px solid white";
            //this.borderSwap();
        }
    }
    colisionDetection(){
        if(level%3 ==0){
            if(this.head.x >=800 || this.head.x <0){
                this.colision();
            }
            if(this.head.y >=600 || this.head.y <0){
                this.colision();
            }
        }
        if(level%3 ==1 ){
            
            if(this.head.x >=800){
                this.head.x = 0;
            }
            if(this.head.x <0){
                this.head.x = 800;
            }
            if(this.head.y >=600){
                this.head.y = 0;
            }
            if(this.head.y < 0){
                this.head.y =600;
            }
        }
        if(level%3 ==2){
            
            if(this.head.x >=800){
                this.head.x = 0;
                rangeSlide-=10;
            }
            if(this.head.x <0){
                this.head.x = 800;
                rangeSlide+=10;
            }
            if(this.head.y >=600){
                this.head.y = 0;
                rangeSlide-=10;
            }
            if(this.head.y < 0){
                this.head.y =600;
                rangeSlide+=10;
            }
            if(rangeSlide <= 30){
                rangeSlide =30;
            }
            if(rangeSlide>=350){
                rangeSlide=350;
            }
            clearInterval(game);
            game = setInterval(gameLoop,rangeSlide);

        }
        for(let k = 3;k<this.snake.length;k++){
            if(this.head.x == this.snake[k].x && this.head.y ==this.snake[k].y){
                this.colision();
            }
        }
    }
    colision(){
        clearInterval(game);
        this.addToStorage();
        location.reload();
    }
    addToStorage(){
        if(localStorage.getItem(0) ==null && level%3==0){
            if(level%3==0){
                localStorage.setItem(1,HighScore);
                document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(1);
            }
        }
        else if(localStorage.getItem(1) ==null && level%3==1){
            if(level%3==1){
                localStorage.setItem(2,HighScore);
                document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(2);
            }
        }
        else if(localStorage.getItem(2) ==null && level%3==2){    
            if(level%3==2){
                localStorage.setItem(3,HighScore);
                document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(3);
            }
        }

        
        else{
            if(level%3==0){
                if(localStorage.getItem(1)<HighScore){
                    localStorage.removeItem(1);
                    localStorage.setItem(1,HighScore);
                }  
            }
            else if(level%3==1){
                if(localStorage.getItem(2)<HighScore){
                    localStorage.removeItem(2);
                    localStorage.setItem(2,HighScore);
                }  
            } 
            else if(level%3==2){
                if(localStorage.getItem(3)<HighScore){
                    localStorage.removeItem(3);
                    localStorage.setItem(3,HighScore);
                }  
            } 
            
            
        }
    }
    addBody()
    {
        HighScore++;
        document.getElementById("D").innerHTML = "Current Score: "+HighScore;
        let tail = this.snake[this.snake.length-1];
        let direct = tail.direct;
        let x = tail.x;
        let y = tail.y;
        //alert(direct);
        if(direct =="right"){
            x-=20;
        }
        if(direct =="left"){
            x+=20;
        }
        if(direct =="up"){
            y+=20;
        }
        if(direct =="down"){
            y-=20;
        }
        this.snake.push({x,y,direct});
        ctx.fillRect(x,y,20,20);
    }
    drawBall(x,y)
    {   
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x,y,20,20);
    }
}
///////////////////////////////////////////
//////////////////////Listener/////////////
document.addEventListener('input', (e) => {
    var input = $("#range_1");
    input.on('input', function(){ 
        document.getElementById("rangeOne").innerHTML="Game Speed: "+ document.getElementById("range_1").value;
        rangeSlide = document.getElementById("range_1").value;

    });
});   


document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowDown"&& direction !="up"&&fired == true){
        direction ="down";
        fired = false;
    }
    if(e.code ==="ArrowRight"&& direction!="left"&&fired ==true){
        direction ="right";
        fired = false;
    }
    if(e.code ==="ArrowLeft"&&direction!="right"&&fired ==true){
        direction ="left";
        fired = false;
    }
    if(e.code ==="ArrowUp"&&direction!="down"&&fired ==true){
        direction ="up";
        fired = false;
    }
    if (e.code ==="KeyC" && swotchState%2 ==0)
        snecc.addBody();
    if (e.code ==="KeyM" && swotchState%2==0){
        generateCheatBall()
        snecc.drawBall(xCFood,yCFood);
        mArray.push({xCFood,yCFood});
        numOfFoods++;
    }
});
/////////////////////////////////
//////////VARIABLES//////////////
var numOfFoods =0;
var mArray =[];
var temp = 0
var direction ="right";
var xFood = 100;
var yFood = 100;
var rangeSlide = 115;
let fired = true;
var xGrid = new Array(40).fill(0);
var yGrid = new Array(30).fill(0);
var x = document.getElementById("myAudio"); 
var HighScore = 0;
var level = 0;
var tmp =0;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
ctx.fillStyle = '#0F0';
let snecc = new Snecc();
snecc.draw(ctx);
snecc.addBody();
snecc.addBody();
var xCFood;
var yCFood
let game;
let swotchState =1;
/////////////////////////////////
////////FUNCTIONS////////////////
function generateCheatBall(){
    xCFood = Math.floor((Math.random() * 40))*20;
    yCFood = Math.floor((Math.random() * 30))*20;
        for(var f = 0;f<1;f++){
            if(xGrid[xCFood/20] == 1 && yGrid[yCFood/20]==1)
            {
                f=0;
                xCFood = Math.floor((Math.random() * 40))*20;
                yCFood = Math.floor((Math.random() * 30))*20;
            }
        }
}
function checkScore(){
    if(level%3 ==0){
        document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(1);
    }
    if(level%3 ==1){
        document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(2);
    }
    if(level%3 ==2){
        document.getElementById("C").innerHTML="Highest Score: "+localStorage.getItem(3);
    }
}
checkScore();
function hidePopUp(){
    document.getElementById("dialog-1").hide();
}
function swotch(){
    swotchState++;
    if(swotchState%2==0){
        document.getElementById("range_1").disabled = false;
        document.getElementById("hidden").style.display ="block";
    }
    else{
        rangeSlide = 115;
        document.getElementById("range_1").value = 115
        document.getElementById("rangeOne").innerHTML = "Game Speed: 115";
        document.getElementById("range_1").disabled = true;
        document.getElementById("hidden").style.display ="none";
    }
}
function resetScore(){
    localStorage.removeItem(level%3+1);
    document.getElementById("C").innerHTML="Highest Score: 0";
}
function LevelSelector(){
    level ++;
    checkScore();
    snecc.levelSwap(ctx,level%3);

}
function EnableCheats(){
    document.getElementById('dialog-1').show();
    document.getElementById("start").disabled = false;
    clearInterval(game);
}
function enablePause(){
    document.getElementById("pause").disabled = false;
}
function StartGame(){
    if(tmp ==0){
        x.loop = true;
        x.play();
    }
    document.getElementById("lvlS").disabled = true;
    tmp++;
    game = setInterval(gameLoop,rangeSlide);
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = true;
    let myVar = setTimeout(enablePause, 3000);
}
function PauseGame(){
    document.getElementById("start").disabled = false;
    clearInterval(game);
}
function gameLoop(){
    temp++;
    //snecc.blackHoles(temp);
    snecc.drawBall(xFood,yFood);
    snecc.draw(ctx,2);
}