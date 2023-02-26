let video;
let posenet;
let pose;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
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

function getNeck(xleft, yleft, xright, yright) {
    length = dist(xleft,yleft,xright,yright);
    fill(0,255,0);
    ellipse((length/2), yleft,32);
}

function draw() {
    image(video, 0, 0);

    if (pose) {

        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        let color = dist(pose.nose.x, 0, pose.nose.y, 0);

        fill(color,0,0);
        ellipse(pose.nose.x, pose.nose.y, d+64);

        fill(0,0,255);
        ellipse(0,0,100);

        for(let i = 3; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            if(i == 5) {
                let x2 = pose.keypoints[i+1].position.x;
                let y2 = pose.keypoints[i+1].position.y;
                getNeck(x,y,x2,y2);
            }
            fill(0, 255, 0);
            ellipse(x, y, 16, 16)
        }
    }
}