var piComputer = (function() {
	var _numIn = 0,
		_numOut = 0;

	var getCurrentPI = function() {
		return (_numIn+_numOut) === 0 ? 0 : (4 * _numIn) / (_numIn + _numOut);
	};

	var _getRandomPoint = function() {
		return {
			x: (Math.random() * 2) - 1,
			y: (Math.random() * 2) - 1
		};
	};

	var addGuess = function () {
		var pt = _getRandomPoint();
		console.log ("Next point: " + pt.x + " , " + pt.y);
		var len = Math.sqrt(pt.x*pt.x + pt.y*pt.y);
		if (len <=1 ) {
			_numIn += 1;
		} else {
			_numOut += 1;
		}
	};

	var getState = function () {
		return "Num Inside: " + _numIn + "; Num Outside: " + _numOut;
	};

	return {
		getCurrentPI: getCurrentPI,
		addGuess: addGuess,
		getState: getState
	};
}) ();

for (var i = 0; i < 1000000; i++) {
	piComputer.addGuess();
	if (i % 1000 === 0)
		console.log (piComputer.getState())
}
alert (piComputer.getCurrentPI());
