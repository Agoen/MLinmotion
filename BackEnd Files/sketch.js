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

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position(520, 139)
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    detector.detect(video, gotDetections);
}

function gotPoses(poses) {
    console.log(poses)
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

function ChangeHeadColor() {
    nose_g = 0;
    nose_r = 255;
}

function draw() {
    image(video, 0, 0);

    if (pose) {

        let nose = pose.nose;
        fill(nose_r,nose_g,nose_b);
        ellipse(nose.x, nose.y, 64);


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

        //Testing
        }
    }

}