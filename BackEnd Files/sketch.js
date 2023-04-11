// GLOBAL VARIABLES FOR ENTIRE BACKEND TO USE
//
//
//
let video;
let poseNet;
let pose;

// variables for detecting people and labeling
let detector;
let detections = [];

// keypoints used, global variables
let head, shoulder_l, shoulder_r, hip_l, hip_r, wrist_l, wrist_r;

// head color variables
let head_red = 0, head_blue = 0, head_green = 255;
// shoulder color variables
let shoulder_red = 0, shoulder_blue = 0, shoulder_green = 255;
// wrist color variables
let wrist_red = 0, wrist_blue = 0, wrist_green = 255;
// body color variables
let body_red = 0, body_blue = 0, body_green = 255;
// hip color variables
let hip_red = 0, hip_blue = 0, hip_green = 255


//
//
//
// GLOBAL VARIABLES END

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

function changeSpecifiedColor() {
    var head_check = document.getElementById('body1').checked;
    var shoulder_check = document.getElementById('body3').checked;
    var body_check = document.getElementById('body4').checked;
    var wrist_check = document.getElementById('body5').checked;
    var hip_check = document.getElementById('body6').checked;

    if(hip_check) {
        hip_blue = 255, hip_green = 0,hip_red = 255;
    } else {
        hip_blue = 0, hip_green = 255, hip_red = 0;
    }

    if(wrist_check) {
        wrist_blue = 255, wrist_green = 0, wrist_red = 255;
    } else {
        wrist_blue = 0, wrist_green = 255, wrist_red = 0;
    }

    if(head_check) {
        head_blue = 255, head_green = 0, head_red = 255;
    } else {
        head_blue = 0, head_green = 255, head_red = 0;
    }

    if(shoulder_check) {
        shoulder_blue = 255, shoulder_green = 0, shoulder_red = 255;
    } else {
        shoulder_blue = 0, shoulder_green = 255, shoulder_red = 0;
    }

    if(body_check) {
        body_blue = 255, body_green = 0, body_red = 255;
    } else {
        body_blue = 0, body_green = 255, body_red = 0;
    }
}

// Where everything is drawn to show the user
function draw() {
    image(video, 0, 0);

    if (pose) {

        // Section for creating a pose keypoint for the head
        head = pose.nose;
        fill(head_red,head_green,head_blue);
        ellipse(head.x, head.y, 50);

        // Section for creating a pose keypoint for the shoulders
        shoulder_l = pose.leftShoulder;
        fill(shoulder_red, shoulder_green, shoulder_blue);
        ellipse(shoulder_l.x, shoulder_l.y, 50);
        shoulder_r = pose.rightShoulder;
        fill(shoulder_red, shoulder_green, shoulder_blue);
        ellipse(shoulder_r.x, shoulder_r.y, 50);

        // Section of code of creating a pose keypoint for the right and left hip, and using that to set the body point for access through the frontend
        hip_l = pose.leftHip;
        hip_r = pose.rightHip;
        fill(hip_red, hip_green, hip_blue);
        ellipse(hip_r.x, hip_r.y, 50);
        fill(hip_red, hip_green, hip_blue);
        ellipse(hip_l.x, hip_l.y, 50);
        fill(body_red, body_green, body_blue);
        quad(shoulder_l.x, shoulder_l.y, shoulder_r.x, shoulder_r.y, hip_r.x, hip_r.y, hip_l.x, hip_l.y);

        // Section of code for creating a pose keypoint for the wrists
        wrist_l = pose.leftWrist;
        fill(wrist_red, wrist_green, wrist_blue);
        ellipse(wrist_l.x, wrist_l.y, 50);
        wrist_r = pose.rightWrist;
        fill(wrist_red, wrist_green, wrist_blue);
        ellipse(wrist_r.x, wrist_r.y, 50);


        // Variables used for distance estimation
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

        

        // Ignoring keypoints that are unused, create ellipses representing all the other keypoints that posenet offers
        // for(let i = 5; i < pose.keypoints.length; i++) {
        //     let x = pose.keypoints[i].position.x;
        //     let y = pose.keypoints[i].position.y;
        //     fill(0, 255, 0);
        //     ellipse(x, y, 16, 16)
        // }

        // Drawing a box around the person detected
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

        // Displaying distance estimation dependent on the confidence score
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
        }
    }

}