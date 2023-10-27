//create canvas
const fgCvs = document.getElementById("fgCvs");
const fgCtx = fgCvs.getContext("2d");
const bgCvs = document.getElementById("bgCvs");
const bgCtx = bgCvs.getContext("2d");
const ratio = window.devicePixelRatio;
let cvsWidth = window.innerHeight * ratio;
let cvsHeight = window.innerHeight * ratio;
const gridSize = 13;
fgCvs.style.zoom = 1 / ratio;
bgCvs.style.zoom = 1 / ratio;

//global properties
let tankRotateSpeed = 1;
let tankMoveSpeed = 100;
let mousePressed = false;
let secondsPassed;
let oldTimeStamp;
let fps;
let mouseX = null;
let mouseY = null;
let mouseGX = 0;
let mouseGY = 0;
let lastEnteredObj;
let lastEnteredObjName;
let lastHoveredCount = 0;
let lastHoverMaxCount = 80;

//set canvas properties
fgCvs.width = cvsWidth;
fgCvs.height = cvsHeight;
bgCvs.width = cvsWidth;
bgCvs.height = cvsHeight;

//Add event handlers
fgCvs.addEventListener('click',function(e) {clickHandler(fgCvs,e)})
fgCvs.addEventListener('mousemove',function(e) {moveHandler(fgCvs,e)})
//window.addEventListener('resize', function(e) {resizeWindowHandler(window)})


//Arrays
let Tanks = [];
let Tiles = [];

//Images
let tileimg = new Image()
tileimg.src = "images/grass.jpg"
let tankimg = new Image()
tankimg.src = "images/tanks.png"


//Player Tank
let playerTank;

//////////////////////////

function clickHandler(c,e) {

const rect = c.getBoundingClientRect();

//LOOPS THROUGH ALL TANK OBJ AND ALL TANK SUB OBJECTS TO CHECK IF MOUSE HAS ENTERED OBJ
let foundEnteredObj = false
Tanks.some(tank => {
    var k = Object.keys(tank)
   for(var i=0; i < k.length; i++){
    
    let tankKey = tank[k[i]]

    //move squares
     if (Array.isArray(tankKey) && typeof tankKey === 'object') 
    {tankKey.some(propObj => {if(mouseEntered(mouseX,mouseY,propObj)==true)
        {propObj.onClick(); foundEnteredObj = true; return true;}})}
    
    //tank menu, tank bullet...
    else if(typeof tankKey === 'object') 
    {
        
        if(mouseEntered(mouseX,mouseY,tankKey)==true){try{tankKey.onClick();foundEnteredObj = true;}catch{};
        
        }
    
        //tank menu buttons, text...
        var sK = Object.keys(tankKey)
        for (var j=0; j < sK.length; j++){
            let tankMenuKey = tankKey[sK[j]]
            if (Array.isArray(tankMenuKey) && typeof tankMenuKey === 'object') {
                tankMenuKey.some(propObj => {if(mouseEntered(mouseX,mouseY,propObj)==true&&tankKey.visible==true&&tankMenuKey.visible==true)
                    {propObj.onClick(); foundEnteredObj = true; return true;}
                    })
            }
        }

    
    
    }
    
    }
    
    //tank
    if (mouseEntered(mouseX,mouseY,tank)) 
        {tank.onClick(); 
        foundEnteredObj = true;
        
        return true;}

    if (foundEnteredObj == true) {return}
})

//if no entered object found use default mouse cursor
if (foundEnteredObj == true) {;if(lastHoveredCount!==60) {lastHoveredCount+=1}}else{
    // mouseExited();
}
   

};

function mouseExitedNoObj(){
    fgCvs.style.cursor = 'default'
    lastEnteredObj = null;
    lastEnteredObjName = null;
}

function enteredObj(obj) {
   try{lastEnteredObj.onExit();}catch{};
    
    lastEnteredObj = obj
    lastEnteredObjName = obj.id
}



function mouseEntered(mouseX,mouseY,obj) {
    if (obj.hasOwnProperty('position') && obj.hasOwnProperty('size')) {
   mouseX = mouseX
   mouseY = mouseY
    if (mouseX >= (obj.position.x) && mouseX <= ((obj.position.x) + obj.size.w)
    && mouseY >= (obj.position.y) && mouseY <= ((obj.position.y) + obj.size.h) && obj.visible == true) {
        //try{if(obj.text=='SHOOT'){console.log('test')}}catch{}
        return true;
    } else {
    return false;}
    
}  else  { 
return false;
}
}



function mouseHovered(mouseX,mouseY,obj) {
    if (obj.hasOwnProperty('position')) {
  
    if (mouseX >= (obj.position.x) && mouseX <= ((obj.position.x) + obj.size.w) && mouseY >= (obj.position.y) && mouseY <= ((obj.position.y) + obj.size.h)  && obj.visible == true && lastHoveredCount >= 60) {
        return true;
    }
   return false;
} else {
    return false;
}
}

 


function moveHandler(c,e) {

const rect = c.getBoundingClientRect();
mouseX = (e.clientX - (rect.left / ratio)) * ratio;
mouseY = (e.clientY - (rect.top / ratio)) * ratio;
mouseGX = convertPixelsToGridPos(mouseX)
mouseGY = convertPixelsToGridPos(mouseY)

}

function  resizeWindowHandler(window) {
    
  
    cvsHeight = window.innerHeight
    cvsWidth = window.innerHeight

    
    fgCvs.width = cvsWidth;
    fgCvs.height = cvsHeight;
    bgCvs.width = cvsWidth;
    bgCvs.height = cvsHeight;

    //resize all objects
    Tanks.forEach(tank => {tank.size.w=cvsWidth/gridSize;tank.size.h=cvsHeight/gridSize})

  }

  function getAngleForFacingTarget(srcX,srcY,tarX,tarY) {

    let angle

    let diffX = tarX - srcX
    let diffY = tarY - srcY
    angle = Math.atan2(diffY,diffX) * (180/Math.PI)

    angle = Math.round(angle)-90

    if(angle<0) {angle = 360 + (angle)}

    if(angle>=360){angle = 360-angle}

    return angle

}



function gameLoop(timeStamp) {

//LOOPS THROUGH ALL TANK OBJ AND ALL TANK SUB OBJECTS TO CHECK IF MOUSE HAS ENTERED OBJ
let foundEnteredObj = false
Tanks.some(tank => {
    var k = Object.keys(tank)
   for(var i=0; i < k.length; i++){
    
    let tankKey = tank[k[i]]

    //move squares
     if (Array.isArray(tankKey) && typeof tankKey === 'object') 
    {tankKey.some(propObj => {if(mouseEntered(mouseX,mouseY,propObj)==true)
        {propObj.onEnter(); foundEnteredObj = true; return true;
        }})}
    
    //tank menu, tank bullet...
    else if(typeof tankKey === 'object') 
    {
        
        if(mouseEntered(mouseX,mouseY,tankKey)==true){tankKey.onEnter();foundEnteredObj = true;}
        else{
            //if(lastEnteredObj==lastExitedObj && lastExitedObj !== null){try{tankKey.onExit()}catch{}return;}
        }
    
        //tank menu buttons, text...
        var sK = Object.keys(tankKey)
        for (var j=0; j < sK.length; j++){
            let tankMenuKey = tankKey[sK[j]]
            if (Array.isArray(tankMenuKey) && typeof tankMenuKey === 'object') {
                tankMenuKey.some(propObj => {if(mouseEntered(mouseX,mouseY,propObj)==true&&tankKey.visible==true)
                    {propObj.onEnter(); foundEnteredObj = true; return true;
                    }})
            }
        }

    
    
    }
    
    }
    
    //tank
    if (foundEnteredObj == false && mouseEntered(mouseX,mouseY,tank)) 
        {tank.onEnter(); 
        foundEnteredObj = true;
        
        return true;}
        

    if (foundEnteredObj == true) {return;}
})

//if no entered object found use default mouse cursor
if (foundEnteredObj == true) {;if(lastHoveredCount!==60) {lastHoveredCount+=1}}else{
     mouseExitedNoObj();
}

//UPDATE
Tanks.forEach(tank => {
 tank.update(secondsPassed);  

//hover handler


//if (tank.mouseHoverMax > lastHoveredCount && lastHoveredObj !== null) {lastHoveredCount+=1};

if (mouseHovered(mouseX,mouseY,tank)){
    tank.onHover();
} 
}
)


// Calculate how much time has passed
secondsPassed = (timeStamp - oldTimeStamp) / 1000;
oldTimeStamp = timeStamp;

//calculate fps
fps = Math.round(1 / secondsPassed);
    
//Move forward in time with a maximum amount
secondsPassed = Math.min(secondsPassed, 0.1);

//get last entered obj
leo = lastEnteredObjName


//CLEAR
fgCtx.clearRect(0,0,fgCvs.width,fgCvs.height)

//DRAW

fgCtx.font = 14*ratio + 'px Consolas';
fgCtx.fillStyle = 'black';
let statsStr = 'FPS:'+ fps + '\n' + 'MX:' + mouseX + '\n' + 'MY:' + mouseY + '\n' + 'MGX:' + mouseGX + '\n' + 'MGY:' + mouseGY + '\n' + 'LHC:' + lastHoveredCount + "\n" + 'LEO:' + leo;
let lines = statsStr.split('\n');
let lineheight = 14*ratio;
for (var j = 0; j < lines.length; j++)
{fgCtx.fillText(lines[j],20*ratio,(lineheight*(j+1)) + fgCtx.measureText('M').width)};

//draw actual tank
Tanks.forEach(tank => {
    tank.draw()
})
//draw tank menu seperately so it's always on top
Tanks.forEach(tank => {
    tank.tankMenu.draw()
})

//REQUEST NEW FRAME

setTimeout( () => {requestAnimationFrame(gameLoop);
}, 0)

}


function mouseIntersectsWith(mouseX,mouseY,objX,objY,objW,objH) {
    if (mouseX >= (objX) && mouseX <= ((objX) + objW)
        && mouseY >= (objY) && mouseY <= ((objY) + objH)) {
        return true;}
        
        return false;
            
}

function convertPixelsToGridPos(i) {
return Math.floor(i / (cvsWidth/gridSize)) 
}


function makeID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}





window.onload = function() {

//generate Tiles
for (y = 0; y < gridSize; y++) {
for (x = 0; x < gridSize; x++) {
    let tileObj = new Tile(x,y);
    Tiles.push(tileObj);
    tileObj.draw();
}
}


//generate Tanks and accompanying menu
for(i = 0; i < gridSize - 3; i++) {
    let tankObj 
    if(Tanks.length==0){ 
    tankObj = new Tank(true)  
    playerTank = tankObj
    } else {
    tankObj = new Tank(false)
    }




    console.log(tankObj);
    Tanks.push(tankObj);
    tankObj.draw();
}



//Start gameloop
gameLoop();

}

