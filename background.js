var background_canvas;
var context;
var NumberofDots = 200;
var Dots_Array = [];
var i = 0;
var p = 0;
var MaxDistance = 150;
var LineWidth_Variable = 1000;
var defaultLineWidth = 1;
var DotRadius = 1;
var WIDTH = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var Mobile = false;
function viewport(){
    WIDTH = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(WIDTH < 900){
        NumberofDots = 50;
        console.log("Width: " + WIDTH);
        Mobile = true;
    }
}

var q = 0;
var w = 0;

var types = ['Programmer', 'Designer', 'Hacker', 'Developer', 'Student', 'Creator', 'Innovator'];

function main(){
    viewport();
    background_canvas = document.getElementById("background");
    context = background_canvas.getContext("2d");
    FPS();
    Resize(background_canvas);
}

function FPS(){
    DRAW();
    UPDATE_FRAME();
    window.requestAnimationFrame(FPS, background_canvas);
}

function dot(x, y, X_Speed, Y_Speed){
    this.radius = DotRadius //Radius of the dots
    DOT_POSITION(); //TODO
    this.x = DOTX;
    this.y = DOTY;
    this.X_Speed = (Math.random() - Math.random()); // Select a random (positive or negative) speed for the dot
    this.Y_Speed = (Math.random() - Math.random()); // Select a random (positive or negative) speed for the dot
}

main(); //run the main function 


function DOT_POSITION(){
    DOTX = (background_canvas.width)*Math.random(); //generate the dot on a random spot on the screen 
    DOTY = (background_canvas.height)*Math.random(); //generate the dot on a random spot on the screen
}

for(i = 0; i < NumberofDots; i++){ // generate a bunch of dots and store them in the array 
    Dots_Array[i] = new dot();
}

function DRAW(){
    context.clearRect(0,0, background_canvas.width, background_canvas.height);
    DRAW_DOTS();
}


function UPDATE_FRAME(){
    for(i=0; i<Dots_Array.length; i++){        
    Dots_Array[i].x += Dots_Array[i].X_Speed; // for every frame 
    Dots_Array[i].y += Dots_Array[i].Y_Speed;
        
    //right edge
    if(Dots_Array[i].x + Dots_Array[i].radius > background_canvas.width ){  // this triggers if the x component of the particles move outside the canvas
      Dots_Array[i].x = background_canvas.width - Dots_Array[i].radius;   // this moves the dot right to the inside edge of the canvas
      Dots_Array[i].X_Speed =-Dots_Array[i].X_Speed; // makes the dot bounce in the other direction
        }
        
        //left edge
        if(Dots_Array[i].x < Dots_Array[i].radius){
      Dots_Array[i].x = Dots_Array[i].radius;
      Dots_Array[i].X_Speed =-Dots_Array[i].X_Speed;
    }
        
        //top edge
        if(Dots_Array[i].y  + Dots_Array[i].radius > background_canvas.height){
      Dots_Array[i].y = background_canvas.height - Dots_Array[i].radius;
      Dots_Array[i].Y_Speed =-Dots_Array[i].Y_Speed;
        }
        
        //bottom edge
        if(Dots_Array[i].y < Dots_Array[i].radius){
      Dots_Array[i].y = Dots_Array[i].radius;
      Dots_Array[i].Y_Speed =-Dots_Array[i].Y_Speed;
        } 
  }
}

function DRAW_DOTS(){
    for(i = 1; i < Dots_Array.length; i++){
        context.beginPath();
        context.arc(Dots_Array[i].x, Dots_Array[i].y, Dots_Array[i].radius, 0, 2*Math.PI, false);
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.fill();
        context.stroke();
        
        for(p = 1; p < Dots_Array.length; p++){
            var distance = Math.sqrt(Math.pow((Dots_Array[p].x-Dots_Array[i].x),2)+Math.pow((Dots_Array[p].y-Dots_Array[i].y),2));
            
            if(distance < MaxDistance){
                var newWidth;
                if((LineWidth_Variable/(Math.pow(distance, 2))) < 1){
                    newWidth = (LineWidth_Variable/(Math.pow(distance, 2)));
                }
                else{
                    newWidth = defaultLineWidth;
                }
                context.beginPath();
                context.moveTo(Dots_Array[i].x, Dots_Array[i].y);
                context.lineTo(Dots_Array[p].x, Dots_Array[p].y);
                context.strokeStyle = "black";
                context.lineWidth = newWidth;
                context.stroke();
            }
        }
        context.beginPath();
        context.arc(Dots_Array[i].x, Dots_Array[i].y, Dots_Array[i].radius, 0, 2*Math.PI, false);
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.fill();
        context.stroke();
    }
}


function Resize(background_canvas){
    if(Mobile){
        background_canvas.style.width = WIDTH;
        background_canvas.style.height='225%';
        background_canvas.width = WIDTH;
        background_canvas.height = background_canvas.offsetHeight;
    }else{
        background_canvas.style.width ='100%';
        background_canvas.style.height='225%';
        background_canvas.width = background_canvas.offsetWidth;
        background_canvas.height = background_canvas.offsetHeight;
    } 
}


tagswitcher(0);
function tagswitcher(q) {
    if (types.length >= q+3) {
        setTimeout(function() {
            $("#tag1").fadeOut(function() {
                $(this).text(types[q]).fadeIn();
            });
            q = q+1;
            setTimeout(function() {
                $("#tag2").fadeOut(function() {
                    $(this).text(types[q+2]).fadeIn();
                });
                tagswitcher(q);
            }, 3500);
        }, 4000);
        
    } else{ // Loop
        tagswitcher(0);
    }

}

