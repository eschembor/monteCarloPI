var piComputer = (function() {
	var _numIn = 0,
		_numOut = 0;

	var getCurrentPI = function() {
		return (_numIn+_numOut) === 0 ? 0 : (4 * _numIn) / (_numIn + _numOut);
	};

	var getNumberOfPoints = function () {
		return _numIn + _numOut;
	}

	var _getRandomPoint = function() {
		return {
			x: (Math.random() * 2) - 1,
			y: (Math.random() * 2) - 1,
			in: null
		};
	};

	var addGuess = function () {
		var pt = _getRandomPoint();
		var len = Math.sqrt(pt.x*pt.x + pt.y*pt.y);
		if (len <=1 ) {
			_numIn += 1;
			pt.in = true;
		} else {
			_numOut += 1;
			pt.in = false;
		}
		return pt;
	};

	var getState = function () {
		return "Num Inside: " + _numIn + "; Num Outside: " + _numOut;
	};

	return {
		getCurrentPI: getCurrentPI,
		getNumberOfPoints: getNumberOfPoints,
		addGuess: addGuess,
		getState: getState
	};
}) ();

var viz = (function () {
	var activePoints = [];
	var c = document.getElementById("drawPI");
	var ctx = c.getContext("2d");

	var drawPt = function (pt) {
		var drawX = 200 * pt.x + 200;
		var drawY = 200 * pt.y + 200;
		ctx.fillStyle = pt.in ? "rgb(0,200,0)" : "rgb(200,0,0)";
		ctx.fillRect (drawX, drawY, 10, 10);
	};

	return {
		drawPt: drawPt
	};
})();


var MAX_GUESSES = 1000000,
	i = 0;

function getAndDrawNextPoint () {
	var nextPt = piComputer.addGuess();
	viz.drawPt (nextPt); 
	document.getElementById("currentPI").innerHTML = "" + piComputer.getCurrentPI();
	document.getElementById("currentPoints").innerHTML = "" + piComputer.getNumberOfPoints();
	i += 1;
	if (i < MAX_GUESSES) {
		requestAnimationFrame (getAndDrawNextPoint);
	} else {
		alert ("Done!");
	}
}

requestAnimationFrame (getAndDrawNextPoint);

