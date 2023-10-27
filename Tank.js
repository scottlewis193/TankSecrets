class Tank {




    constructor(isPlayer) {
        let tank = this;
        let btnW = 150-20;
        let btnH = 50-20;
        this.id = makeID(3);
        this.isPlayer = isPlayer;
        this.isFiringBullet = false;
        this.image = tankimg;
        this.range = 2;
        this.hp = 3;
        this.ap = 1;
        this.mouseHoverMax = 60;
        this.menuW = 150;
        this.menuH = (this.isPlayer==true) ? 100 : 200;
        const btn1Text = 'SHOOT';
        const btn2Text = 'TRADE';
        const btn3Text = 'CHAT';
        const baseHeight = 14;
        const fontDef = 14*ratio +'px Consolas'
        const fontHeight = fgCtx.measureText('M').width
        const txt1Text = (this.isPlayer==true) ? 'ID:' + tank.id + '(you)' : 'ID:' + tank.id
        const txt2Text = 'HP:' + tank.hp
        const txt3Text = 'RG:' + tank.range
        const txt4Text = 'AP:' + tank.ap
        this.moveSquaresVisible = false

        let pos = this.getValidPosition();
        this.size = {
            w:cvsWidth/gridSize,
            h:cvsHeight/gridSize
        }
        this.position = {
            gX:pos.posX,
            gY:pos.posY,
            x:pos.posX * this.size.w,
            y:pos.posY * this.size.h,
            ngX:pos.posX,
            ngY:pos.posY,
            angle:0,
            nAngle:0
        };
        this.visible = true;
        this.moveSquares = [{
                name: 'upleft',
                modAngle:135,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('upleftclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }

                },
                {
                name:'up',
                modAngle:180,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('upclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }

                },
                {
                name:'upright',
                modAngle:225,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('uprightclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer' 
                }
                },
                {
                name:'right',
                modAngle:270,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('rightclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }
                },
                {
                name:'downright',
                modAngle:315,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('downrightclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }
                },
                {
                name:'down',
                modAngle:0,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('downclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }
                },
                {
                name:'downleft',
                modAngle:45, 
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: false,
                onClick() {
                    console.log('downleftclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }
                },
                {
                name:'left',
                modAngle:90,
                size: {
                    w:cvsWidth/gridSize,
                    h:cvsHeight/gridSize
                },
                position: {
                    gX:0,
                    gY:0,
                    x:0,
                    y:0
                },
                visible: true,
                onClick() {
                    console.log('leftclicked')
                    tank.toggleMoveSquares();
                    tank.moveTank(this.modAngle,this.position.gX,this.position.gY)
                },
                onEnter() {
                    fgCvs.style.cursor = 'pointer'
                }
            }]

        this.tankMenu = {
                id: tank.id + ' tankMenu',
                position: {x:(tank.position.gX > (gridSize/2)) ? tank.position.x-(tank.menuW*ratio):tank.position.x+tank.size.w,y:(tank.position.gY > (gridSize/2)) ? tank.position.y-(tank.menuH*ratio)+tank.size.h:tank.position.y},
                size: {w:tank.menuW,h:tank.menuH},
                colour:'rgba(77, 77, 77, 1)',
                visible: false,
            text: [
                {name:'exit',
                position:{x:((tank.menuW))-((fgCtx.measureText('X').width+fontHeight)),y:(fontHeight+10)},
                rposition:{x:((tank.menuW))-((fgCtx.measureText('X').width+fontHeight)),y:(fontHeight+10)},
                size:{w:fgCtx.measureText('X').width,h:fgCtx.measureText('M').width},
                text:'X',
                font:fontDef,
                colour:'rgba(180, 180, 180, 1)',
                visible:true,
                onClick() {tank.tankMenu.visible = false; fgCvs.style.cursor = 'default';},
                onEnter() {enteredObj(this); fgCvs.style.cursor = 'pointer';this.colour = 'white'},
                onExit() {this.colour = 'rgba(180, 180, 180, 1)';   fgCvs.style.cursor = 'default';}

                },
                {name:'id',
                position: {x:((tank.menuW)/2)-((fgCtx.measureText(txt1Text).width+fontHeight)/2),y:(fontHeight+10)},
                rposition: {x:((tank.menuW)/2)-((fgCtx.measureText(txt1Text).width+fontHeight)/2),y:(fontHeight+10)},
                text: txt1Text,
                font: fontDef,
                colour: 'white',
                visible:true
                },
                {name:'hp',
                position: {x:((tank.menuW)/2)-((fgCtx.measureText(txt2Text).width+fontHeight)/2),y:fontHeight+30},
                rposition: {x:((tank.menuW)/2)-((fgCtx.measureText(txt2Text).width+fontHeight)/2),y:fontHeight+30},
                text: txt2Text,
                font: fontDef,
                colour: 'white',
                visible:true
                },
                {name:'range',
                position: {x:((tank.menuW)/2)-((fgCtx.measureText(txt3Text).width+fontHeight)/2),y:fontHeight+50},
                rposition: {x:((tank.menuW)/2)-((fgCtx.measureText(txt3Text).width+fontHeight)/2),y:fontHeight+50},
                text: txt3Text,
                font: fontDef,
                colour: 'white',
                visible:true
                },
                {name:'ap',
                position: {x:((tank.menuW)/2)-((fgCtx.measureText(txt4Text).width+fontHeight)/2),y:fontHeight+70},
                rposition: {x:((tank.menuW)/2)-((fgCtx.measureText(txt4Text).width+fontHeight)/2),y:fontHeight+70},
                text: txt4Text,
                font: fontDef,
                colour: 'white',
                visible:true
                }
            ],
            buttons: [ 
                {
                id: btn1Text,
                position: {x:10,y:90},
                rposition: {x:10,y:90},
                size: {w:btnW,h:btnH},
                colour: 'rgba(66, 66, 66, 1)',
                text: btn1Text,
                textposition: {x:(((btnW)/2)-((fgCtx.measureText(btn1Text).width)/2))*ratio,y:(fontHeight+(btnH/2)-((fontHeight)/2))*ratio},
                textcolour: 'rgba(180, 180, 180, 1)',
                font: fontDef,
                visible: (tank.isPlayer==true) ? false : true,
                onClick() {
                    playerTank.tankBullet.targetPosition.x = tank.position.x;
                    playerTank.tankBullet.targetPosition.y = tank.position.y;
                    playerTank.isFiringBullet = true;
                    playerTank.position.nAngle = getAngleForFacingTarget(playerTank.position.gX,playerTank.position.gY,tank.position.gX,tank.position.gY)
                    tank.tankMenu.visible = false;
                },
                onEnter() {
                    enteredObj(this)
                    fgCvs.style.cursor = 'pointer';
                    this.colour = 'rgba(120, 120, 120, 1)';
                    this.textcolour = 'white';
                },
                onExit() {
                    fgCvs.style.cursor = 'default'; 
                    this.colour = 'rgba(66, 66, 66, 1)';
                    this.textcolour = 'rgba(180, 180, 180, 1)';

                }      
                },
                {
                id: btn2Text,
                position: {x:10,y:125},
                rposition: {x:10,y:125},
                size: {w:btnW,h:btnH},
                colour: 'rgba(66, 66, 66, 1)',
                text: btn2Text,
                textposition: {x:(((btnW)/2)-((fgCtx.measureText(btn2Text).width)/2))*ratio,y:(fontHeight+(btnH/2)-((fontHeight)/2))*ratio},
                textcolour: 'rgba(180, 180, 180, 1)',
                font: fontDef,
                visible: (tank.isPlayer==true) ? false : true,
                onClick() {
                    this.tankMenu.visible = false;
                },
                onEnter() {
                    enteredObj(this)
                    fgCvs.style.cursor = 'pointer'
                    this.colour = 'rgba(120, 120, 120, 1)'
                    this.textcolour = 'white'
                },
                onExit() {
                    fgCvs.style.cursor = 'default'; 
                    this.colour = 'rgba(66, 66, 66, 1)'
                    this.textcolour = 'rgba(180, 180, 180, 1)'
                  
                }    
                },
                {
                id: btn3Text,
                position: {x:10,y:160},
                rposition: {x:10,y:160},
                size: {w:btnW,h:btnH},
                colour: 'rgba(66, 66, 66, 1)',
                text: btn3Text,
                textposition: {x:(((btnW)/2)-((fgCtx.measureText(btn3Text).width)/2))*ratio,y:(fontHeight+(btnH/2)-((fontHeight)/2))*ratio},
                textcolour: 'rgba(180, 180, 180, 1)',
                font: fontDef,
                visible: (tank.isPlayer==true) ? false : true,   
                onClick() {
                    this.tankMenu.visible = false;
                },
                onEnter() {
                    enteredObj(this)
                    fgCvs.style.cursor = 'pointer'
                    this.colour = 'rgba(120, 120, 120, 1)'
                    this.textcolour = 'white'
                },
                onExit() {
                    fgCvs.style.cursor = 'default'; 
                    this.colour = 'rgba(66, 66, 66, 1)'
                    this.textcolour = 'rgba(180, 180, 180, 1)'
                   
                }  
                }          
            ],
            onEnter() {   
                enteredObj(this)
                fgCvs.style.cursor = 'default'
            },
            onExit() {
                fgCvs.style.cursor = 'default'
            },
            draw() {
            if(this.visible == true) {
                //DRAW MENU
                let menuObj = this
                //container
                fgCtx.fillStyle = menuObj.colour

                //draw in a position where its never off screen
                fgCtx.fillRect(menuObj.position.x,menuObj.position.y,menuObj.size.w*ratio,menuObj.size.h*ratio)
                //text
                menuObj.text.forEach(t => {fgCtx.fillStyle = t.colour; fgCtx.font = t.font; fgCtx.fillText(t.text,t.position.x,t.position.y)} )
                //buttons
                menuObj.buttons.forEach(b => {if(b.visible == true){fgCtx.fillStyle = b.colour; fgCtx.font = b.font; fgCtx.fillRect(b.position.x, b.position.y,b.size.w*ratio,b.size.h*ratio); fgCtx.fillStyle = b.textcolour; fgCtx.fillText(b.text,(b.position.x) + (b.textposition.x),(b.position.y) + (b.textposition.y))}})
            }
            
        }
        
        }

        this.tankBullet = {
            id: tank.id + 'tankBullet',
            position: {x:tank.position.x, y:tank.position.y, angle:tank.position.angle},
            targetPosition:{x:0,y:0},
            size: {w:tank.size.width/4,y:tank.size.height/4},
            colour: 'black',
            draw() {
                if(tank.isFiringBullet==true) {
                fgCtx.save();
                fgCtx.translate(this.position.x+this.size.w/2,this.position.y+this.size.h/2);
                fgCtx.rotate(this.position.angle*Math.PI/180);
                fgCtx.translate(-this.position.x-this.size.w/2,-this.position.y-this.size.h/2);
                fgCtx.fillStyle = 'black';
                fgCtx.fillRect(this.position.x,this.position.y,this.size.w,this.size.h);
                fgCtx.restore();
                }
            },
            update() {
                if(tank.isFiringBullet==true) {
                    if (this.targetPosition.x > this.position.x) {this.position.x +=1} else {this.position.x -=1}
                    if (this.targetPosition.y > this.position.y) {this.position.y +=1} else {this.position.y -=1}
                } else {
                    this.position.x = tank.position.x
                    this.position.y = tank.position.y
                    tank.isFiringBullet = false;
                }
                if (this.position.x = this.targetPosition.x && this.position.y == this.targetPosition.y) {
                    tank.isFiringBullet = false;
                }
            }
        }
        }
    
    moveTank(newAngle,newgX,newgY) {
        this.position.nAngle = newAngle
        this.position.ngX = newgX
        this.position.ngY = newgY
    }

    getValidPosition() {

        let posValid = false;
        let posX
        let posY
        
            while(posValid == false) {
        
                posX = Math.floor(Math.random() * gridSize);
                posY = Math.floor(Math.random() * gridSize);
                
                posValid = true;
        
                Tanks.some(tank => { 
                if (this !== tank) {
      
                if (Math.abs(posX - tank.position.gX) < 3 && Math.abs(posY - tank.position.gY) < 3) {
                posValid = false;
                return true;
                }}})
            
            }
     
        
        return {posX,posY}

    }

    onClick() {
        this.toggleMoveSquares();
        this.tankMenu.visible = true;
    }
    onEnter() {
    enteredObj(this);
       fgCvs.style.cursor = 'pointer';

    }
    onExit() {
        fgCvs.style.cursor = 'default';
        lastEnteredObj = null;
        lastEnteredObjName = null;
    } 
    onHover() {
        
    }
    toggleMoveSquares() {
if (this.isPlayer==true) {
        //upleft -1 -1
        this.moveSquares[0].position.gX = this.position.gX-1;
        this.moveSquares[0].position.gY = this.position.gY-1;
        this.moveSquares[0].position.x = this.moveSquares[0].position.gX * this.size.w;
        this.moveSquares[0].position.y = this.moveSquares[0].position.gY * this.size.h;
        //up 0 -1
        this.moveSquares[1].position.gX = this.position.gX;
        this.moveSquares[1].position.gY = this.position.gY-1;
        this.moveSquares[1].position.x = this.moveSquares[1].position.gX * this.size.w;
        this.moveSquares[1].position.y = this.moveSquares[1].position.gY * this.size.h;
        //upright 1 -1
        this.moveSquares[2].position.gX = this.position.gX+1;
        this.moveSquares[2].position.gY = this.position.gY-1;
        this.moveSquares[2].position.x = this.moveSquares[2].position.gX * this.size.w;
        this.moveSquares[2].position.y = this.moveSquares[2].position.gY * this.size.h;
        //right 1 0
        this.moveSquares[3].position.gX = this.position.gX+1;
        this.moveSquares[3].position.gY = this.position.gY;
        this.moveSquares[3].position.x = this.moveSquares[3].position.gX * this.size.w;
        this.moveSquares[3].position.y = this.moveSquares[3].position.gY * this.size.h;
        //downright 1 1
        this.moveSquares[4].position.gX = this.position.gX+1;
        this.moveSquares[4].position.gY = this.position.gY+1;
        this.moveSquares[4].position.x = this.moveSquares[4].position.gX * this.size.w;
        this.moveSquares[4].position.y = this.moveSquares[4].position.gY * this.size.h;
        //down 0 1
        this.moveSquares[5].position.gX = this.position.gX;
        this.moveSquares[5].position.gY = this.position.gY+1;
        this.moveSquares[5].position.x = this.moveSquares[5].position.gX * this.size.w;
        this.moveSquares[5].position.y = this.moveSquares[5].position.gY * this.size.h;
        //downleft -1 1
        this.moveSquares[6].position.gX = this.position.gX-1;
        this.moveSquares[6].position.gY = this.position.gY+1;
        this.moveSquares[6].position.x = this.moveSquares[6].position.gX * this.size.w;
        this.moveSquares[6].position.y = this.moveSquares[6].position.gY * this.size.h;
        //left -1 0
        this.moveSquares[7].position.gX = this.position.gX-1;
        this.moveSquares[7].position.gY = this.position.gY;
        this.moveSquares[7].position.x = this.moveSquares[7].position.gX * this.size.w;
        this.moveSquares[7].position.y = this.moveSquares[7].position.gY * this.size.h;
    
        
        let v
        if (this.moveSquaresVisible == false) {v = true} else {v = false}
        this.moveSquares.forEach(MS => {MS.visible = v})
        this.moveSquaresVisible = v
    }

    }

    draw() {

        //bullet
        this.tankBullet.draw();
        
        if (this.isPlayer == true && this.moveSquaresVisible == true) {
        fgCtx.fillStyle = 'yellow'
        fgCtx.fillRect(this.moveSquares[0].position.x,this.moveSquares[0].position.y,this.moveSquares[0].size.w,this.moveSquares[0].size.h)    
        fgCtx.fillRect(this.moveSquares[1].position.x,this.moveSquares[1].position.y,this.moveSquares[1].size.w,this.moveSquares[1].size.h) 
        fgCtx.fillRect(this.moveSquares[2].position.x,this.moveSquares[2].position.y,this.moveSquares[2].size.w,this.moveSquares[2].size.h) 
        fgCtx.fillRect(this.moveSquares[3].position.x,this.moveSquares[3].position.y,this.moveSquares[3].size.w,this.moveSquares[3].size.h) 
        fgCtx.fillRect(this.moveSquares[4].position.x,this.moveSquares[4].position.y,this.moveSquares[4].size.w,this.moveSquares[4].size.h) 
        fgCtx.fillRect(this.moveSquares[5].position.x,this.moveSquares[5].position.y,this.moveSquares[5].size.w,this.moveSquares[5].size.h) 
        fgCtx.fillRect(this.moveSquares[6].position.x,this.moveSquares[6].position.y,this.moveSquares[6].size.w,this.moveSquares[6].size.h) 
        fgCtx.fillRect(this.moveSquares[7].position.x,this.moveSquares[7].position.y,this.moveSquares[7].size.w,this.moveSquares[7].size.h) 
        }


        (this.isPlayer == true) ? fgCtx.fillStyle = 'blue' : fgCtx.fillStyle = 'red'
        fgCtx.save();
        fgCtx.translate(this.position.x+this.size.w/2,this.position.y+this.size.h/2);
        fgCtx.rotate(this.position.angle*Math.PI/180);
        fgCtx.translate(-this.position.x-this.size.w/2,-this.position.y-this.size.h/2);
        if (this.isPlayer == true) {
            fgCtx.drawImage(this.image,170,240,170,170,this.position.x,this.position.y,this.size.w,this.size.h)
        } else {
            fgCtx.drawImage(this.image,170,440,170,170,this.position.x,this.position.y,this.size.w,this.size.h)
        }
        
        fgCtx.restore();



  

    }
    update(secondsPassed) {
     
        //bullet
        this.tankBullet.update();



        //set actual position of tankMenu elements
        this.tankMenu.buttons.forEach(e => {e.position.x = this.tankMenu.position.x + (e.rposition.x*ratio); e.position.y = this.tankMenu.position.y + (e.rposition.y*ratio);})
        this.tankMenu.text.forEach(e => {e.position.x = this.tankMenu.position.x + (e.rposition.x*ratio); e.position.y = this.tankMenu.position.y + (e.rposition.y*ratio);})

        let hasRotated = true;
        let hasMoved = true;
        let moveIncrement = (((cvsWidth/ratio)/gridSize) / 100) * (tankMoveSpeed * secondsPassed);

        if (this.position.angle != this.position.nAngle) {
            hasRotated = false
            let oldAngle = this.position.angle
            let newAngle = this.position.nAngle

            if (oldAngle == 0 && newAngle > 180) {oldAngle = 360}
            if (oldAngle > 180 && newAngle == 0) {newAngle = 360}

            let modAngle = ((oldAngle - newAngle > 180) || (newAngle - oldAngle > 180)) ? 0 : 360

            let modOldAngle = (modAngle == 360) ? modAngle - oldAngle : oldAngle
            let modNewAngle = (modAngle == 360) ? modAngle - newAngle : newAngle

            if(modOldAngle >= modNewAngle) {this.position.angle += moveIncrement;} else if(modOldAngle < modNewAngle) {this.position.angle -= moveIncrement;}      
            if (this.position.angle > 360) {this.position.angle = 0} else if(this.position.angle < 0) {this.position.angle = 360}

            if(Math.floor(this.position.angle) == this.position.nAngle) {this.position.angle = Math.floor(this.position.angle)}
            else if(Math.ceil(this.position.angle) == this.position.nAngle) {this.position.angle = Math.ceil(this.position.angle)}
        }

        
   
        if ((this.position.gX != this.position.ngX || this.position.gY != this.position.ngY) && (hasRotated == true)) {
            hasMoved = false
            let oldgX = this.position.gX
            let oldgY = this.position.gY
            let newgX = this.position.ngX
            let newgY = this.position.ngY

            //move tank based on final destination
            if (newgX > oldgX) {this.position.x += moveIncrement*ratio; 
                this.position.gX = Math.floor(this.position.x / (cvsWidth/gridSize))} 
            else if(oldgX > newgX) {this.position.x -= moveIncrement*ratio; 
                this.position.gX = Math.ceil(this.position.x / (cvsWidth/gridSize))}
            if (newgY > oldgY) {this.position.y += moveIncrement*ratio; 
                this.position.gY = Math.floor(this.position.y / (cvsHeight/gridSize))} 
            else if(oldgY > newgY) {this.position.y -= moveIncrement*ratio; 
                this.position.gY = Math.ceil(this.position.y / (cvsHeight/gridSize))}

                //reposition TankMenu after movement has finished
                if (this.position.gX == this.position.ngX && this.position.gY == this.position.ngY) {
                   this.tankMenu.position.x = (this.position.gX > (gridSize/2)) ? this.position.x-(this.menuW*ratio):this.position.x+this.size.w
                   this.tankMenu.position.y = (this.position.gY > (gridSize/2)) ? this.position.y-(this.menuH*ratio)+this.size.h:this.position.y
                }


        }
        
    }

};

