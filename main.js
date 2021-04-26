img="";
status="";
objects=[];
function preload(){
img=loadImage("dog_cat.jpg");
}

function setup(){
canvas=createCanvas(640,420);
canvas.position(320,100);
video=createCapture(VIDEO);
video.hide();
detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded(){
    console.log("cocossd is loaded");
    status=true;
  
}

function gotResult(error,result){
if(error){
    console.log(error);
}
else{
    console.log(result);
    objects=result;
}
}

function draw(){
image(video,0,0,640,420);

if(status!=""){
    detector.detect(video,gotResult);
r=random(255);
g=random(255);
b=random(255);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="status:objects detected";
        document.getElementById("objects_detected").innerHTML="number of objects detected:"+objects.length;
        percentage=floor(objects[i].confidence*100);
        fill(r,g,b);
        text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
     noFill();
     stroke(r,g,b);
     rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }

}

}