/*
//
/   Knobs JS
/   
/   Credits: https://www.youtube.com/watch?v=ELUSz0L8vTA
/ 					 https://css-tricks.com/converting-color-spaces-in-javascript/
//
*/


// Get reference to <body> element to change background colour with knobs
const body = document.querySelector('#body');

// Create array of knob elements
let knobs = document.querySelectorAll('.knob');

// Global scope
var rad;
var deg;
let buffer;
let intBuffer;
var hexOutputValue = '#ff0000';
var hslOutputValue = 'hsl(0, 100%, 50%)';
var rgbOutputValue = 'rgb(255, 0, 0)';
var pos360;

//
// Selectors
//

// Buttons
const hslButton = document.querySelector('#hsl-button');
const rgbButton = document.querySelector('#rgb-button');

// Knob text
const knob1Text = document.querySelector('#knob1-text');
const knob2Text = document.querySelector('#knob2-text');
const knob3Text = document.querySelector('#knob3-text');

// Knob values
const knob1Value = document.querySelector('#knob1-value');
const knob2Value = document.querySelector('#knob2-value');
const knob3Value = document.querySelector('#knob3-value');

// Outputs

const hexOutput  = document.querySelector('#hex-output');
const hslOutput  = document.querySelector('#hsl-output');
const rgbOutput  = document.querySelector('#rgb-output');




// Mode

var mode = 'hsl';

var hue = 0;
var saturation = 100;
var lightness = 50;

var red = 255;
var green = 0;
var blue = 0;

// Maintain colour when switching modes
function toggleKnobs() {



	if (mode == 'rgb') {
		buffer = rgbOutputValue;
		buffer = buffer.replace('rgb(', '').replaceAll(' ','').replace(')', '');
		buffer = buffer.split(',');

		intBuffer = buffer.map((item) => {
			return parseInt(item);
		});

		red = intBuffer[0];
		green = intBuffer[1];
		blue = intBuffer[2];
	}
	if (mode == 'hsl') {
		buffer = hslOutputValue;
		buffer = buffer.replace('hsl(', '').replaceAll(' ', '').replaceAll('%', '').replace(')', '');
		buffer = buffer.split(',');

		intBuffer = buffer.map((item) => {
			return parseInt(item);
		});

		hue = intBuffer[0];
		saturation = intBuffer[1];
		lightness = intBuffer[2];
	}


  knobs.forEach(function(knob, i=0) {
  	knob.style.transform = `rotate(${intBuffer[i]+10}deg)`;
  	i++;
  });
} 

// Switch mode
hslButton.addEventListener('click', function() {
	if (mode == 'rgb') {
		mode = 'hsl';
		console.log('Mode changed to ' + mode);

		toggleKnobs();

		knob1Text.textContent = 'Hue';
		knob2Text.textContent = 'Saturation';
		knob3Text.textContent = 'Lightness';

		knob1Value.textContent = `${hue}`;
		knob2Value.textContent = `${saturation}%`;
		knob3Value.textContent = `${lightness}%`;

		body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

		rgbButton.classList.remove('selected');
	  hslButton.classList.add('selected');
	}
});
rgbButton.addEventListener('click', function() {
	if (mode == 'hsl') {
		mode = 'rgb';
		console.log('Mode changed to ' + mode);

		toggleKnobs();

		knob1Text.textContent = 'Red';
		knob2Text.textContent = 'Green';
		knob3Text.textContent = 'Blue';

		knob1Value.textContent = `${red}`;
		knob2Value.textContent = `${green}`;
		knob3Value.textContent = `${blue}`;

		body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

		hslButton.classList.remove('selected');
	  rgbButton.classList.add('selected');
	}
});


//
// Converters
//

// RGB to hex
function rgbToHex(r, g, b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1) {
		r = "0" + r;
	}
	if (g.length == 1) {
		g = "0" + g;
	}
	if (b.length == 1) {
		b = "0" + b;
	}

	return "#" + r + g + b;
}

// HSL to hex
function hslToHex(h, s, l) {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs((h / 60) % 2 - 1)),
			m = l - c/2,
			r = 0,
			g = 0,
			b = 0;

	if (0 <= h && h < 60) {
	  r = c; g = x; b = 0;  
	} else if (60 <= h && h < 120) {
	  r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
	  r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
	  r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
	  r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
	  r = c; g = 0; b = x;
	}

	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);

	if (r.length == 1) {
		r = "0" + r;
	}
	if (g.length == 1) {
		g = "0" + g;
	}
	if (b.length == 1) {
		b = "0" + b;
	}

	return "#" + r + g + b;
}

// HSL to RGB
function hslToRGB(h, s, l) {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs((h / 60) % 2 - 1)),
			m = l - c/2,
			r = 0,
			g = 0,
			b = 0;

	if (0 <= h && h < 60) {
	  r = c; g = x; b = 0;  
	} else if (60 <= h && h < 120) {
	  r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
	  r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
	  r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
	  r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
	  r = c; g = 0; b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return "rgb(" + r + "," + g + "," + b + ")";
}

// RGB to HSL
function rgbToHSL(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

	if (delta == 0) {
		h = 0;
	} else if (cmax == r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax == g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) {
		h += 360;
	}

	l = (cmax + cmin) / 2;

	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

// Copy to clipboard
var copyButtons = document.querySelectorAll('.copy');

copyButtons.forEach(function(button) {
	button.addEventListener('click', function() {
		switch(button) {
	  	case copyButtons[0]:
	  	  var copyText = document.querySelector("#hex-output");
	  	  navigator.clipboard.writeText(copyText.textContent);
	  	  button.textContent = 'copied!';
	  	  setTimeout(function(){button.textContent = 'COPY';}, 1000);
	  	  break;

	  	case copyButtons[1]:
	  	  var copyText = document.querySelector("#hsl-output");
	  	  navigator.clipboard.writeText(copyText.textContent);
	  	  button.textContent = 'copied!';
	  	  setTimeout(function(){button.textContent = 'COPY';}, 1000);
	  	  break;

	  	case copyButtons[2]:
	  	  var copyText = document.querySelector("#rgb-output");
	  	  navigator.clipboard.writeText(copyText.textContent);
	  	  button.textContent = 'copied!';
	  	  setTimeout(function(){button.textContent = 'COPY';}, 1000);
	  	  break;
	  }
	});
});

// Calculate the position of the little white knob in degrees, in a circle around the knob center
function calculateDegree(e, knob) {
	
  // Get knob centers
	var x1 = knob.offsetLeft + knob.offsetWidth / 2;
	var y1 = knob.offsetTop + knob.offsetHeight / 2;

	const x2 = e.clientX;
	const y2 = e.clientY;

	const deltaX = x1 - x2;
	const deltaY = y1 - y2;

	rad = Math.atan2(deltaY, deltaX);

	deg = rad * (180 / Math.PI);	

  pos360 = Math.floor(deg - 90);

	if (deg >= -180 && deg <= 90) {
		pos360 += 360;
	}

  console.log('rad: ' + rad);
  console.log('deg: ' + deg);
  console.log('pos360: ' + pos360);
  
	return deg;
}

// Loop over knobs, add event listeners, give output
knobs.forEach(function(knob) {
  knob.addEventListener('mousedown', function () {

    knob.addEventListener('mousemove', rotate);

		function rotate(e) {

			const result = Math.floor(calculateDegree(e, knob) - 90);


			switch(knob) {
			  case knobs[0]:
			    console.log('rotating first knob');
			    if (mode == 'hsl') {

			    	hue = pos360;
				    
				    knob1Value.textContent = `${hue}`;
				    console.log('hue: ' + hue);

				    body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

				    // Outputs
				    hexOutputValue = hslToHex(hue, saturation, lightness);
				    hexOutput.textContent = hexOutputValue;

				    hslOutputValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
				    hslOutput.textContent = hslOutputValue;

				    rgbOutputValue = hslToRGB(hue, saturation, lightness);
				    rgbOutput.textContent = rgbOutputValue;

			    } else if (mode == 'rgb') {

			    	red = Math.floor(pos360 * 255 / 360);

			    	knob1Value.textContent = `${red}`;
			    	console.log('red: ' + red);

			    	body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			    	// Outputs
			    	hexOutputValue = rgbToHex(red, green, blue);
			    	hexOutput.textContent = hexOutputValue;

			    	hslOutputValue = rgbToHSL(red, green, blue);
			    	hslOutput.textContent = hslOutputValue;

			    	rgbOutputValue = `rgb(${red}, ${green}, ${blue})`;
			    	rgbOutput.textContent = rgbOutputValue;
			    }
			    break;

			  case knobs[1]:
			    console.log('rotating second knob');
			    if (mode == 'hsl') {

				    saturation = -Math.floor(pos360 * 100 / 360) + 100;

				    knob2Value.textContent = `${saturation}%`;
				    console.log('saturation: ' + saturation);

				    body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

				    // Outputs
				    hexOutputValue = hslToHex(hue, saturation, lightness);
				    hexOutput.textContent = hexOutputValue;

				    hslOutputValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
				    hslOutput.textContent = hslOutputValue;

				    rgbOutputValue = hslToRGB(hue, saturation, lightness);
				    rgbOutput.textContent = rgbOutputValue;

			    } else if (mode == 'rgb') {

			    	green = Math.floor(pos360 * 255 / 360);

			    	knob2Value.textContent = `${green}`;
			    	console.log('green: ' + green);

			    	body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			    	// Outputs
			    	hexOutputValue = rgbToHex(red, green, blue);
			    	hexOutput.textContent = hexOutputValue;

			    	hslOutputValue = rgbToHSL(red, green, blue);
			    	hslOutput.textContent = hslOutputValue;

			    	rgbOutputValue = `rgb(${red}, ${green}, ${blue})`;
			    	rgbOutput.textContent = rgbOutputValue;
			    }
			    break;

			  case knobs[2]:
			    console.log('rotating third knob');
			    if (mode == 'hsl') {

				    lightness = Math.floor((result + 180) * 100 / 360);

				    if (pos360 >= 90 && pos360 <= 180 && deg != 180) {
				    	lightness += 100;
				    }

				    knob3Value.textContent = `${lightness}%`;
				    console.log('lightness: ' + lightness);

				    body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

				    // Outputs
				    hexOutputValue = hslToHex(hue, saturation, lightness);
				    hexOutput.textContent = hexOutputValue;

				    hslOutputValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
				    hslOutput.textContent = hslOutputValue;

				    rgbOutputValue = hslToRGB(hue, saturation, lightness);
				    rgbOutput.textContent = rgbOutputValue;

			    } else if (mode == 'rgb') {

			    	blue = Math.floor(pos360 * 255 / 360);

			    	knob3Value.textContent = `${blue}`;
			    	console.log('blue: ' + blue);

			    	body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			    	// Outputs
			    	hexOutputValue = rgbToHex(red, green, blue);
			    	hexOutput.textContent = hexOutputValue;

			    	hslOutputValue = rgbToHSL(red, green, blue);
			    	hslOutput.textContent = hslOutputValue;

			    	rgbOutputValue = `rgb(${red}, ${green}, ${blue})`;
			    	rgbOutput.textContent = rgbOutputValue;
			    }
			    break;

			  default:
			    console.log('Select a knob');
			}

			knob.style.transform = `rotate(${result}deg)`;
	    
	    console.log('result: ' + result);
	    console.log('\n');
		}

		knob.addEventListener('mouseup', function () {
			knob.removeEventListener('mousemove', rotate);
		});
	});
});

