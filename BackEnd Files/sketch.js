let video;
let poseNet;
let pose;
let detector;
let detections = [];
let nose_r = 0;
let nose_g = 255;
let nose_b = 0;

function preload() {
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
    if(error) {
        console.error(error);
    }
    detections = results;
    detector.detect(video, gotDetections);
}

// Sets up the canvas for displaying poses
function setup() {
    // Sets the canvas so it has the same width and height of the container, and fits the screen correctly
    let canvasDiv = document.getElementById('container');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    var canvas = createCanvas(width, height);

    // Sets the canvas to wherever the div with id "container" is located
    canvas.parent('container');
    video = createCapture(VIDEO);
    video.hide();
    
    // loads poseNet model for drawing
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    detector.detect(video, gotDetections);
}

// Checks if there are poses on screen, CAN BE UPDATED FOR MULTIPLE POSES IN THE FUTURE
function gotPoses(poses) {
    console.log(poses)
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

// Sanity check to see if poseNet has loaded
function modelLoaded() {
    console.log('poseNet ready');
}

// if checkbox selected, change selected keypoint color
function ChangeHeadColor() {
    nose_g = 0;
    nose_r = 255;
}

// Where everything is drawn to show the user
function draw() {
    image(video, 0, 0);

    if (pose) {

        let nose = pose.nose;
        fill(nose_r,nose_g,nose_b);
        ellipse(nose.x, nose.y, 64);

        let focal_length = 3.6 * (10 ** -3);
        let the_height = 0.0385;
        let right_ankle = pose.rightAnkle;
        let left_ankle = pose.leftAnkle;
        let right_Shoulder = pose.rightShoulder;
        let left_Shoulder = pose.leftShoulder;
        let right_Hip = pose.rightHip;
        let left_Hip = pose.leftHip;
        let nose_0 = pose.nose;
        let bttm_average_x = (right_Shoulder.x + left_Shoulder.x) / 2;
        let bttm_average_y = (right_Shoulder.y + left_Shoulder.y) / 2;
        let image_height_1 = (dist (right_Shoulder.x, right_Shoulder.y,left_Shoulder.x, left_Shoulder.y)) * (0.0058 * 0.0001);
        let image_height_2 = (dist (left_Shoulder.x, left_Shoulder.y,left_Hip.x, left_Hip.y)) * (0.0040 * 0.0001);
        let actual_distance_1 = (the_height * focal_length) / image_height_1;        
        let actual_distance_2 = (the_height * focal_length) / image_height_2;        
        let leftShoulderScore = pose.keypoints.find(kp => kp.part === 'leftShoulder').score;
        let marking = detections[0];

        


        for(let i = 3; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16)
        }

        for(let i = 0; i < detections.length; i++) {
            let object = detections[i];
                if(object.label === 'person') {
                    stroke(0, 255, 0);
                    strokeWeight(4);
                    noFill();
                    rect(object.x, object.y, object.width, object.height);

                    noStroke();
                    fill(255);
                    textSize(24);
                    text(object.label + i, object.x + 10, object.y + 24);
                }

        if (leftShoulderScore >= 0.8)
        {
            noStroke();
            fill (255,0,255);
            textSize (26);
            text("The estimated distance (m): ",marking.x + 10,470)
            text(round(actual_distance_1,1),marking.x + 340,470);
        }

        else
        {
            noStroke();
            fill (0,255,0);
            textSize (26);
            text("The estimated distance (m): ",marking.x + 10,470)
            text(round(actual_distance_2,1),marking.x + 340,470);

            
        }
        //Testing
        }
    }

}