var Application = ( function() {

    var canvas;
    var ctx;
  	var imgData;
		var pix;
		var WIDTH;
		var HEIGHT;
		var flickerInterval;
		var switchTimeout;
		var isOn;
		var self;
		var btnElm;

		var init = function() {
			canvas = document.getElementById('canvas');
			ctx = canvas.getContext('2d');
			canvas.width = WIDTH = 450;
			canvas.height = HEIGHT = 300;
			isOn = true;
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.fill();
			imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
			pix = imgData.data;
			flickerInterval = setInterval(flickering, 50);
			btnElm = document.getElementById('btn');
			btnElm.addEventListener('click', toggleScreen, false);
		};

		var flickering = function() {
			for (var i = 0; i < pix.length; i += 4) {
				var color = (Math.random() * 255) + 50;
				pix[i] = color;
				pix[i + 1] = color;
				pix[i + 2] = color;
			}
			ctx.putImageData(imgData, 0, 0);
		};

		var toggleScreen = function() {
			var msg = document.getElementById('msg');
			msg.style.opacity = 0;
      msg.style.display = 'block';

			if ( typeof switchTimeout != 'undefined') {
				clearTimeout(switchTimeout);
			}
			if (isOn) {
				clearInterval(flickerInterval);
				document.body.classList.add('screenOff');
				ctx.fillStyle = '#222';
				ctx.fillRect(0, 0, WIDTH, HEIGHT);
				ctx.fill();
				msg.innerHTML = 'Thanks!';
			} else {
        document.body.classList.remove('screenOff');
				flickerInterval = setInterval(flickering, 50);
				msg.innerHTML = 'Really??';
			}
			msg.style.opacity = 1;
			switchTimeout = window.setTimeout(function() {
				msg.style.opacity = 0;
			}, 2750);
			isOn = !isOn;
		};

		return {
			init : init
		};
	}());

Application.init();
