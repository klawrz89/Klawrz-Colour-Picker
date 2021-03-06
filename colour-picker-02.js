/*
//
/   Knobs JS
/   
//   Credits: https://www.youtube.com/watch?v=ELUSz0L8vTA
/ 					  https://css-tricks.com/converting-color-spaces-in-javascript/
/
//
*/


// Global scope
var rad, deg, pos360;

var mode, hexOutputValue, hslOutputValue, rgbOutputValue;

var hue, saturation, lightness, red, green, blue;


//
/// Selectors
//

// Get reference to <body> element to change background colour with knobs
const body = document.querySelector('#body');

// Get knobs container
const knobsContainer = document.querySelector('.knobs-container');

// Create array of knob elements
let knobs = document.querySelectorAll('.knob');

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


//
/// Functions
//

// For debugging
function logValues() {
	console.log(`rgb(${red}, ${green}, ${blue})`);
	console.log(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
	console.log(`mode: ${mode}`);
	console.log(`pos360: ${pos360}`)
	console.log(`result: ${result}`)
}

// Initialize the program
function init() {

	mode = 'hsl';

	hue = 0;
	saturation = 100;
	lightness = 50;

	red = 255;
	green = 0;
	blue = 0;

	hexOutputValue = '#ff0000';
	hslOutputValue = 'hsl(0, 100%, 50%)';
	rgbOutputValue = 'rgb(255, 0, 0)';

}


//
/// Update functions
//

function updateOutputs() {
	if (mode == 'hsl') {

		hslOutputValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		hslOutput.textContent = hslOutputValue;

		hexOutputValue = hslToHex(hue, saturation, lightness);
		hexOutput.textContent = hexOutputValue;

		rgbOutputValue = hslToRGB(hue, saturation, lightness);
		rgbOutput.textContent = rgbOutputValue;

	} else if (mode == 'rgb') {

		rgbOutputValue = `rgb(${red}, ${green}, ${blue})`;
		rgbOutput.textContent = rgbOutputValue;

		hexOutputValue = rgbToHex(red, green, blue);
		hexOutput.textContent = hexOutputValue;

		hslOutputValue = rgbToHSL(red, green, blue);
		hslOutput.textContent = hslOutputValue;

	}
}

function updateElements() {

	if (mode == 'hsl') {
		knob1Text.textContent = 'Hue';
		knob2Text.textContent = 'Saturation';
		knob3Text.textContent = 'Lightness';

		knob1Value.textContent = `${hue}`;
		knob2Value.textContent = `${saturation}%`;
		knob3Value.textContent = `${lightness}%`;

		body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

		updateKnobsPos();

		rgbButton.classList.remove('selected');
		hslButton.classList.add('selected');
	}

	if (mode == 'rgb') {
		knob1Text.textContent = 'Red';
		knob2Text.textContent = 'Green';
		knob3Text.textContent = 'Blue';

		knob1Value.textContent = `${red}`;
		knob2Value.textContent = `${green}`;
		knob3Value.textContent = `${blue}`;

		body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

		updateKnobsPos();

		hslButton.classList.remove('selected');
		rgbButton.classList.add('selected');
	}

}


//
/// Mode functions
//

function hslMode() {
	// Set mode to HSL
	mode = 'hsl';
	console.log('Mode changed to ' + mode);
	updateElements();
}

function rgbMode(){
	// Set mode to RGB
	mode = 'rgb';
	console.log('Mode changed to ' + mode);
	updateElements();
}

function updateKnobsPos() {
	knobs.forEach((knob) => {

		switch(knob) {

			// Hue / Red
			case knobs[0]:
				if (mode == 'hsl') {
				  knob.style.transform = `rotate(${hue}deg)`;
				}
				if (mode == 'rgb') {
					let newKnobPos = red * 360 / 255;
					knob.style.transform = `rotate(${newKnobPos}deg)`;
				}
				break;

			// Saturation / Green
			case knobs[1]:
				if (mode == 'hsl') {
					let newKnobPos = saturation * 360 / -100;
				  knob.style.transform = `rotate(${newKnobPos}deg)`;
				}
				if (mode == 'rgb') {
					let newKnobPos = green * 360 / 255;
					knob.style.transform = `rotate(${newKnobPos}deg)`;
				}
				break;

			// Lightness / Blue
			case knobs[2]:
				if (mode == 'hsl') {
					let newKnobPos = lightness * 360 / 100 + 180
					knob.style.transform = `rotate(${newKnobPos}deg)`;
				}
				if (mode == 'rgb') {
					let newKnobPos = blue  * 360 / 255;
					knob.style.transform = `rotate(${newKnobPos}deg)`;
				}
				break;
		}
	});
}

//
/// Colour conversion functions
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

	red = r;
	green = g;
	blue = b;

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

	h = Math.floor(h);
	s = Math.floor(s);
	l = Math.floor(l);

	hue = h;
	saturation = s;
	lightness = l;

	return "hsl(" + h + ", " + s + "%, " + l + "%)";
}


// Calculate the position of the white knob position indicator in degrees, in a circle around the knob center
function calculateDegree(e) {

	const target = e.target;
	
  // Get knob centers
	var x1 = target.offsetLeft + target.offsetWidth / 2;
	var y1 = target.offsetTop + target.offsetHeight / 2;

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
  
	return deg;
}

function rotate(e) {

	const target = e.target;

	const result = Math.floor(calculateDegree(e) - 90);

	if (target.matches('#knob1')) {
		console.log('rotating first knob');
		if (mode == 'hsl') {

			hue = pos360;
			
			knob1Value.textContent = `${hue}`;

			body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

			// Outputs
			updateOutputs();

		} else if (mode == 'rgb') {

			red = Math.floor(pos360 * 255 / 360);

			knob1Value.textContent = `${red}`;
			console.log('red: ' + red);

			body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			// Outputs
			updateOutputs();
		}
	}

	if (target.matches('#knob2')) {
		console.log('rotating second knob');
		if (mode == 'hsl') {

			saturation = -Math.floor(pos360 * 100 / 360) + 100;

			knob2Value.textContent = `${saturation}%`;
			console.log('saturation: ' + saturation);

			body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

			// Outputs
			updateOutputs();

		} else if (mode == 'rgb') {

			green = Math.floor(pos360 * 255 / 360);

			knob2Value.textContent = `${green}`;
			console.log('green: ' + green);

			body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			// Outputs
			updateOutputs();
		}
	}

	if (target.matches('#knob3')) {
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
			updateOutputs();

		} else if (mode == 'rgb') {

			blue = Math.floor(pos360 * 255 / 360);

			knob3Value.textContent = `${blue}`;
			console.log('blue: ' + blue);

			body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

			// Outputs
			updateOutputs();
		}
	}

	target.style.transform = `rotate(${result}deg)`;
}


//
/// Event Listeners
//

function handleClick(e) {

  const target = e.target;

	// Copy buttons
	if (target.matches(".copy")) {
		navigator.clipboard.writeText(target.previousSibling.textContent);
		target.textContent = 'copied!';
		setTimeout(() => {target.textContent = 'COPY';}, 1000);
	}

	// Mode buttons
	if (target.matches('#hsl-button')) {
		hslMode();
	}
	if (target.matches('#rgb-button')) {
		rgbMode();
	}

	// Debug
	if (target.matches('#log')) {
		logValues();
	}

}

// Listen for clicks
body.addEventListener('click', handleClick);



// Handle mouse down events
function handleMouseDown(e) {

  const target = e.target;

	if (target.matches('.knob')) {

		//console.log(`mouse down!`)
		
		target.addEventListener('mousemove', rotate);

		target.addEventListener('mouseout', handleMouseOut);
		
		target.addEventListener('mouseup', handleMouseUp);

	}

}

// Handle mouse leave events
function handleMouseOut(e) {
 
	const target = e.target;

	//console.log(`mouse left the knob area`)

	if (target.matches('.knob')) {
		document.addEventListener('mouseup', () => {
			target.removeEventListener('mousemove', rotate);
			target.removeEventListener('mouseout', handleMouseOut);
		});
		//console.log('document listening for mouse up')
	}

}

// Handle mouse up events
function handleMouseUp(e) {

  //console.log(e)
	const target = e.target;

	if (target.matches('.knob')) {

		target.removeEventListener('mousemove', rotate);
		target.removeEventListener('mouseleave', handleMouseOut);
  	target.removeEventListener('mouseup', handleMouseUp);
	
  } 

}

// Listen for mousedown
knobsContainer.addEventListener('mousedown', handleMouseDown);


//
/// Main program execution
//

init();