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
let Lato;
// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    img = loadImage('data/logo.jpg');
    Lato = loadFont('data/Lato-Semibold.ttf');
}
// pricing LABEL
let total = "Totäl : $"
var price = 0;

function setup() {
    createCanvas(displayWidth, displayHeight);
    // Create the video
    //video = createCapture(VIDEO);
    

    var constraints = {
        audio: false,
        video: {
            facingMode: "environment"
        },
         mandatory: {
            minWidth: 1920,
            minHeight: 1080,
            minframerate: 30
        }
    };
    video = createCapture(constraints);
    video.size(displayWidth, 850);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
}

function draw() {
    background(245);
    // Draw the video
    image(video, 0, 0);

    // Draw the label
    fill(167,42,42);
    textFont(Lato);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height - 220);
    //draw total price label
    fill(167,42,42);
    textFont(Lato);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(total + price, width / 2,  height - 180);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results,) {
     // If there is an error
     if (error) {
        console.error(error);
        return;
    }
     // The results are in an array ordered by confidence.
    // console.log(results[0]);
     if (results[0].confidence>.9){
     label = (results[0].label);
     price = (price + 1);
     }
     else{
     label = ".  .  .";
     }
     flippedVideo.remove();
     // Classifiy again!
     classifyVideo();
}
function calculator(){
    if (results[0].confidence>.9){
        label = (results[0].label);
        price = (price + 1);
    }
}
setInterval(calculator, 5000);