let video;
let poseNet;
let pose;
let pose1;
let pose2;

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
        if(poses[1].pose){
            pose1 = poses[1].pose;
        }
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {
    image(video, 0, 0);

    if (pose) {

        let nose = pose.nose;
        fill(0,255,0);
        ellipse(nose.x, nose.y, 64);


        for(let i = 3; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16)
        }
    }

    if (pose1) {

        let nose = pose1.nose;
        fill(0,255,0);
        ellipse(nose.x, nose.y, 64);

        for(let i = 3; i < pose1.keypoints.length; i++) {
            let x = pose1.keypoints[i].position.x;
            let y = pose1.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16)
        }
    }

    // if (pose2) {

    //     let nose = pose2.nose;
    //     fill(0,255,0);
    //     ellipse(pose2.keypoints[0].position.x, pose2.keypoints[0].position.x, 16, 16);

    //     // for(let i = 3; i < pose2.keypoints.length; i++) {
    //     //     let x = pose2.keypoints[i].position.x;
    //     //     let y = pose2.keypoints[i].position.y;
    //     //     fill(0, 255, 0);
    //     //     ellipse(x, y, 16, 16)
    //     // }
    // }
}