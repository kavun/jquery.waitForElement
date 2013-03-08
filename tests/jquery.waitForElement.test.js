
test( "waitForElement returns a Deferred object", function () {
  	var d = $.waitForElement();
  	equal( String(d.promise), String($.Deferred().promise().promise));
});

module('async', {
	setup: function() {
		window.startTime = +new Date;
		window.fix = $('#qunit-fixture');
		window.idToCheck = 'test-element';
		window.classToCheck = 'test-element';
		window.tagToCheck = 'canvas';
		window.threshold = 600;
	},
	teardown: function() {

	}
})

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

asyncTest("finds an element by class name", 1, function() {

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

asyncTest("finds an element by tag name", 1, function() {

	setTimeout(function () { 
		fix.append('<' + tagToCheck + '></' + tagToCheck + '>'); 
	}, threshold - 200);

	$.waitForElement(classToCheck, threshold).done(function () {
		ok(false);
		start();
	}).fail(function () {
		ok(true);
		start();
	});
});