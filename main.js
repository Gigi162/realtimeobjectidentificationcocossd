img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(520, 360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(520,360);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects"

    
}

function preload() {
    img = loadImage("cat.jpg");
}

function draw() {
    image(video, 0, 0, 520, 360)
    

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_obj").innerHTML = "number of objects detected = " +  objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y + 30);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function modelLoaded() {
    console.log("model loaded")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results)
    objects = results;
}