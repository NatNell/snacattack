 // Classifier Variable
 let classifier;
 // Model URL
 let imageModelURL = 'https://teachablemachine.withgoogle.com/models/ZvOJH6geT/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let img;
// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    img = loadImage('data/logo.jpg');
}
// pricing LABEL
let total = "Totäl :$";
var price = 0;

function setup() {
    createCanvas(displaywidth, displayheight);
    // Create the video
    //video = createCapture(VIDEO);
    

    var constraints = {
        audio: false,
        video: {
            facingMode: "environment"
        },
         mandatory: {
            framerate: 30
        }
    };
    video = createCapture(constraints);
    video.size(displaywidth, displayheight);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
}

function draw() {
    background(167,42,42);
    // Draw the video
    image(video, 0, 0);

    // Draw the label
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(label, width / 2, height - 60);
    //draw total price label
    fill(255);
    textSize(20);
    text(total + price, 50,height -50);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    if(results[0].confidence>0.95){
    label = results[0].label;
    }
    else{
    label = "...";
    }
    flippedVideo.remove();
    // Classifiy again!
    classifyVideo();
}
