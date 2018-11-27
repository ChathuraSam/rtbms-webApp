//--------------------
// GET USER MEDIA CODE
//--------------------
navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var video;
var webcamStream;

function startWebcam() {
	if (navigator.getUserMedia) {
		navigator.getUserMedia (

// constraints
{
	video: true,
	audio: false
},

// successCallback
function(localMediaStream) {
	video = document.querySelector('video');
	video.src = window.URL.createObjectURL(localMediaStream);
	webcamStream = localMediaStream;
},

// errorCallback
function(err) {
	console.log("The following error occured: " + err);
}
);
	} else {
		console.log("getUserMedia not supported");
	}  
}

function stopWebcam() {
	webcamStream.stop();
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function init() {
// Get the canvas and obtain a context for
// drawing in it
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext('2d');
}

function snapshot() {
// Draws current image from the video element into the canvas
ctx.drawImage(video, 0,0, canvas.width, canvas.height);
console.log("button triggered");
}

//
//getting capture

(function() {
	"use strict";

	var video, $output;
	var scale = 0.25;

	var initialize = function() {
		$output = $("#output");
		video = $("#video").get(0);
		$("#capture").click(captureImage);                
	};

	var captureImage = function() {
		var canvas = document.createElement("canvas");
		canvas.width = video.videoWidth * scale;
		canvas.height = video.videoHeight * scale;
		canvas.getContext('2d')
		.drawImage(video, 0, 0, canvas.width, canvas.height);

		var img = document.createElement("img");
		img.src = canvas.toDataURL();
		$output.prepend(img);
	};

	$(initialize);            

}());