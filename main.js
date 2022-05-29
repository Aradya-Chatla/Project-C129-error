Peter_pan_song = "";
Harry_potter_theme_song = "";

score_leftWrist = 0;
score_rightWrist = 0;
song = "";

rightWrist_x = 0;
rightWrist_y = 0;

leftWrist_x = 0;
leftWrist_y = 0;

song1s = "";
song2 = "";
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model Loaded !!!');
}

function preload() {
    Peter_pan_song = loadSound("Harry potter theme song.mp3");
    Harry_potter_theme_song = loadSound("Harry potter theme song.mp3");
}

function draw() {
    image(video, 0, 0, 600, 600);

    fill("#00ff00");
    stroke("#ff0000");

    song1 = Peter_pan_song.isPlaying();
    console.log(Peter_pan_song);

    song2 = Harry_potter_theme_song.isPlaying();
    console.log(Harry_potter_theme_song);

    if(score_leftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        Harry_potter_theme_song.stop();

        if (song1 == false) {
            Peter_pan_song.play();
        }
    }

    else {
        console.log("Song Name: Peter_pan_song");
        document.getElementById("song1").innerHTML = "Song Name: Peter_pan_song"
    }

    if (score_rightWrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20);
        Peter_pan_song.stop();

        if (song2 == false) {
            Harry_potter_theme_song.play();
        }
    }

    else {
        console.log("Song Name : Harry_potter_theme_song");
        document.getElementById("song2").innerHTML = "Song Name : Harry_potter_theme_song";
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x +" leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log(score_rightWrist);

    }
}