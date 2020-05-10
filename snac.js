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
let pricing = "Price : $"
var price = 0;

// pricing LABEL
let totalprice = "Totäl : $"
var ptotal = 0;

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
    video.size(displayWidth, 950);
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
    //draw price label
    fill(167,42,42);
    textFont(Lato);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(pricing + price, width / 2,  height - 240);
     //draw total label
     fill(167,42,42);
     textFont(Lato);
     textSize(20);
     textAlign(CENTER, CENTER);
     text(totalprice + total, width / 2,  height - 180);
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
     price = 0.5;
     }
     else{
     label = ".  .  .";
     price = 0;
     }
     flippedVideo.remove();
     // Classifiy again!
     classifyVideo();
    }
