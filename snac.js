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
    Lato = loadFont('data/Lato-Semibold.ttf');
}
// pricing LABEL
let pricing = "Price : $"
var price = 0;

// pricing LABEL
let totalprice = "Totäl : $"
var total = 0;

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
    text(label, width / 2, height - 310);

    //draw price label
    fill(167,42,42);
    textFont(Lato);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(pricing + price, width / 2,  height - 330);

    //draw total label
    fill(167,42,42);
    textFont(Lato);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(totalprice + total, width / 2,  height - 270);
     
    // button add to cart
    button = createImg('data/add1x.png');
    button.position(width / 2 + 8 , height - 230);
    button.mousePressed(addition);
   
    // button reset to cart
    button = createImg('data/reset1x.png');
    button.position(width / 2 - 122, height - 230);
    button.mousePressed(addremove);
}

// Get function for adding item to cart
function addition() {
     total = total + 0.5;   
}
 
// Get function for remove item from cart
function addremove() {
     total = 0;   
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
     label = "·  ·  ·";
     price = 0;
     }
     flippedVideo.remove();
     // Classifiy again!
     classifyVideo();
}
