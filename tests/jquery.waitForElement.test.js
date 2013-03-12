test( "waitForElement returns a Deferred object", function () {

	expect(Object.keys($.Deferred().promise()).length);

  	var d = $.waitForElement();

  	for (var fn in d) {
  		if ($.Deferred().promise()[fn]) {
  			ok(true, 'key "' + fn + '" exists');
  		} else {
  			of(false, 'key "' + fn + '" not in returned $.Deferred().promise()')
  		}
  	}

});

module('async: passing senarios', {

	setup: function() {
		window.startTime = +new Date;
		window.fix = $('#qunit-fixture');
		window.idToCheck = 'test-element';
		window.classToCheck = 'test-class';
		window.tagToCheck = 'canvas';
		window.threshold = 600;
	}

});

asyncTest("fails after treshold, if no id is passed in", 1, function() {
	
	$.waitForElement(null, threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok( ((+new Date) - window.startTime) > threshold - 20 && ((+new Date) - window.startTime) < threshold + 20 );
		start();
	});

});

asyncTest("fails after threshold, if there is no such element", 1, function() {

	$.waitForElement('noelement', threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok( ((+new Date) - window.startTime) > threshold - 20 && ((+new Date) - window.startTime) < threshold + 20 );
		start();
	});

});

asyncTest("finds an element that already exists", 1, function() {

	fix.append('<div id="' + idToCheck + '"></div>');

	$.waitForElement(idToCheck, threshold).done(function () {
		ok(true);
		start();
	}).fail(function () {
		ok(false);
		start();
	});

});

asyncTest("finds an element that exists after the call but before the threshold", 1, function() {

	setTimeout(function () { 
		fix.append('<div id="' + idToCheck + '"></div>'); 
	}, threshold - 40);

	$.waitForElement(idToCheck, threshold).done(function () {
		ok(true);
		start();
	}).fail(function () {
		ok(false);
		start();
	});

});

asyncTest("fails if the element exists after the threshold", 1, function() {

	setTimeout(function () { 
		fix.append('<div id="' + idToCheck + '"></div>'); 
	}, threshold + 40);

	$.waitForElement(idToCheck, threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok(true);
		start();
	});

});


module('async: failure (not implemented) senarios', {

	setup: function() {
		window.startTime = +new Date;
		window.fix = $('#qunit-fixture');
		window.idToCheck = 'test-element';
		window.classToCheck = 'test-class';
		window.tagToCheck = 'canvas';
		window.threshold = 600;
	}

});

asyncTest("fails finding an element by class name", 1, function() {

	setTimeout(function () { 
		fix.append('<div class="' + classToCheck + '"></div>'); 
	}, threshold - 200);

	$.waitForElement(classToCheck, threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok(true);
		start();
	});

});

asyncTest("fails finding an element by tag name", 1, function() {

	setTimeout(function () { 
		fix.append('<' + tagToCheck + '></' + tagToCheck + '>'); 
	}, threshold - 200);

	$.waitForElement(tagToCheck, threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok(true);
		start();
	});

});