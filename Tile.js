class Tile {
    constructor(gX,gY) {
        this.image = tileimg;
        this.size = {
            w:cvsWidth/gridSize,
            h:cvsHeight/gridSize
        }
        this.position = {
            gX,
            gY,
            x:gX*this.size.w,
            y:gY*this.size.h
        }

    }
    draw() {
        bgCtx.fillStyle = 'green'
        bgCtx.drawImage(this.image,this.position.x,this.position.y,this.size.w,this.size.h)
        //bgCtx.fillRect(this.position.x,this.position.y,this.size.w,this.size.h)
    }
};