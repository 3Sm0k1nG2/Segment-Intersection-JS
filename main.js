import Drawer from "./utils/drawer.js";
import { getIntersection } from "./utils/math.js"

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('mainCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {x:0, y:0};

let angle = 0.01;
let angleChange = 0.01;
let autoRotate = false;
const radius = 50;

attachEventListeners();

const A1 = { x: 200, y: 150 };
const A2 = { x: 150, y: 250 };
const B1 = { x: 50, y: 100 };
const B2 = { x: 250, y: 200 };

let I = null;

const ctx = canvas.getContext('2d');
const drawer = new Drawer(ctx);


updateTick();

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawer.drawLine(A1, A2);
    drawer.drawLine(B1, B2);
    
    drawer.drawPoint(A1, "A1");
    drawer.drawPoint(A2, "A2"); 
    drawer.drawPoint(B1, "B1");
    drawer.drawPoint(B2, "B2");
    
    if(I){
        drawer.drawPoint(I, 'I');
    }
}

function updateIntersection() {
    I = getIntersection(A1, A2, B1, B2);
}

function updateAngle() {
    if(autoRotate){
        angle += angleChange;
    }

    A1.x = mouse.x + Math.cos(angle)*radius;
    A1.y = mouse.y - Math.sin(angle)*radius;
    A2.x = mouse.x - Math.cos(angle)*radius;
    A2.y = mouse.y + Math.sin(angle)*radius;
}

function updateTick() {
    updateAngle();
    updateIntersection();

    animate();

    requestAnimationFrame(updateTick);
}

function attachEventListeners() {
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    document.addEventListener('mouseup', (e) => {
        if(e.button === 1){
            angleChange += 0.1;
    
            if(angleChange > 0.5) {
                angleChange = 0.01;
            }
        } else if(e.button === 2) {
            autoRotate = !autoRotate;
        }
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    document.addEventListener('wheel', (e) => {
        if(e.deltaY === 0 ){
            return;
        }
    
        angle += angleChange * (e.deltaY > 0 ? 1 : -1);
    });
}

/** @typedef {{x: number, y: number}} Point */
