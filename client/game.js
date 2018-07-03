import things from "./things.js";

window.onload = init;
var UI = {};
var gameState = {};

function init() {
    var ui_elements = ["gameViewport", "gameWorld", "playerStats"];
    var pass = true;
    ui_elements.forEach(function(id) {
        var e = document.getElementById(id);
        if (e) {
            UI[id] = e;
        } else {
            console.log("UI element "+id+" not found.");
            pass = false;
        }
    });
    if (!pass) {alert("Could not initialize: Not all document elements found.");}


    UI.gameViewport.style.backgroundColor = "#352";
    for (var n=0; n<100; n++) {
        var thingType = (Math.random() > 0.5) ? things.oakTree : things.pineTree;
        var tree = new gameObj(thingType);

        /*
        var char = (Math.random() > 0.5) ? "🌳" : "🌲";
        var tree = new gameObj(char, {
            scale: 3 + rampRand(),
            extraClasses: ["treesway"],
            animOffset: -Math.random() * 90
        });
        */

        tree.scale = 3 + rampRand();
        tree.x = 5+((1+rampRand())%1) * 100;
        tree.y = 5+((1+rampRand())%1) * 100;
    }

    tick();
}

function tick() {
    // Figure out how many ms have passed since last tick
    var now = new Date();
    if (!gameState.lastFrame) {gameState.lastFrame = now;}
    var ms = now.getTime() - gameState.lastFrame.getTime();
    gameState.lastFrame = now;

    // Set up next tick
    requestAnimationFrame(tick);
}



// Helper Functions

function rampRand() {
    // Weighted -1 to +1 random number with values closer to 0 being more common
    return Math.random() - Math.random();
}

function px(float) {
    return Math.round(float)+"px";
}

function em(float) {
    return float+"em";
}



// Game Object object

class gameObj {
    constructor(thing) {
        // Create elements
        this.e = document.createElement("div");
        this.e.classList.add("gameObj");
        this.sprite = document.createElement("div");
        this.sprite.innerHTML = thing.html ? thing.html : "?";
        this.sprite.classList.add("sprite");

        // Add classes
        if (thing.extraClasses) {
            for (var n=0; n<thing.extraClasses.length; n++) {
                this.e.classList.add(thing.extraClasses[n]);
            }
        }

        if (thing.maxAnimOffset) {
            this.e.style.animationDelay = (-Math.random() * thing.maxAnimOffset)+"s";
        }

        // Add to game world
        UI.gameWorld.appendChild(this.e);
        this.e.appendChild(this.sprite);

        // Object properties
        this.scale = 1;
        this.x = 0;
        this.y = 0;
    }

    get x() {
        return this.posX;
    }
    set x(coord) {
        this.posX = coord;
        this.e.style.left = em(this.posX);
    }

    get y() {
        return this.posY;
    }
    set y(coord) {
        this.posY = coord;
        this.e.style.top = em(this.posY);
        this.e.style.zIndex = Math.floor(10*(this.posY));
    }

    get scale() {
        return this._scale;
    }
    set scale(s) {
        this._scale = s;
        this.sprite.style.fontSize = em(this._scale*3);
        this.recenter();
    }

    recenter() {
        this.sprite.style.left = px(-this.sprite.offsetWidth*0.5);
        this.sprite.style.top = px(-this.sprite.offsetHeight*0.9);
    }

}