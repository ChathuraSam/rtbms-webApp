 //--------------------
    // GET USER MEDIA CODE
    //--------------------
    navigator.getUserMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

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

        //downloadCanvas(this, 'myCanvas', 'test.png');
        

        convertCanvasToImage(canvas);
        
      }

      // Converts canvas to an image
      function convertCanvasToImage(canvas) {
       var image = new Image();
       image.src = canvas.toDataURL("image/png");
       return image;
     }

function saveImage() {
	var canvas = document.getElementById('myCanvas');
     var context = canvas.getContext('2d');

      var dl = document.createElement("a");
      dl.href = canvas.toDataURL("images/test/");
      dl.innerHTML = "Download Image!";
      dl.download =  true// Make sure the browser downloads the image
      document.body.appendChild(dl); // Needs to be added to the DOM to work
      dl.click(); // Trigger the click
}
     