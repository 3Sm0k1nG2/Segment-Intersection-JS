
class Drawer {
    /** @param {CanvasRenderingContext2D} ctx */
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * @param {Point} p1 
     * @param {Point} p2 
     */
    drawLine(p1, p2) {
        this.ctx.beginPath();

        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);

        this.ctx.stroke();
    }

    /**
     * @param {Point} point 
     * @param {string} label 
     * @param {boolean} isOutsideBounds  
     */
    drawPoint(point, label, isOutsideBounds = false) {
        this.ctx.beginPath();

        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = isOutsideBounds ? "red" : "black";
        this.ctx.arc(point.x, point.y, 6 + label.length * 4, 0, Math.PI*2);
        this.ctx.fill();


        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "bold 14px Arial"
        this.ctx.fillText(label, point.x, point.y);

        this.ctx.stroke();

        this.ctx.strokeStyle = "black";
    }
}

export default Drawer;
