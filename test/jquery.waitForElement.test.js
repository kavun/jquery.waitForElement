(function ($) {

	test( "waitForElement returns a Deferred object", function () {

		expect(Object.keys($.Deferred().promise()).length);

		var d = $.waitForElement();

		for (var fn in d) {
			if ($.Deferred().promise()[fn]) {
				ok(true, 'key "' + fn + '" exists');
			} else {
				ok(false, 'key "' + fn + '" not in returned $.Deferred().promise()');
			}
		}

	});

	module('async: passing senarios', {

		setup: function() {
			this.startTime = +new Date();
			this.fix = $('#qunit-fixture');
			this.idToCheck = 'test-element';
			this.classToCheck = 'test-class';
			this.tagToCheck = 'canvas';
			this.threshold = 200;
		}

	});

	asyncTest("fails after treshold, if no id is passed in", 1, function() {

		$.waitForElement(null, this.threshold).done(function () {
			ok(false);
			start();
		}).fail($.proxy(function () {
			ok( ((+new Date()) - this.startTime) > this.threshold - 20 && ((+new Date()) - this.startTime) < this.threshold + 20 );
			start();
		}, this));

	});

	asyncTest("fails after this.threshold, if there is no such element", 1, function() {

		$.waitForElement('noelement', this.threshold).done(function () {
			ok(false);
			start();
		}).fail($.proxy(function () {
			ok( ((+new Date()) - this.startTime) > this.threshold - 20 && ((+new Date()) - this.startTime) < this.threshold + 20 );
			start();
		}, this));

	});

	asyncTest("finds an element that already exists", 1, function() {

		this.fix.append('<div id="' + this.idToCheck + '"></div>');

		$.waitForElement(this.idToCheck, this.threshold).done(function () {
			ok(true);
			start();
		}).fail(function () {
			ok(false);
			start();
		});

	});

	asyncTest("finds an element that exists after the call but before the this.threshold", 1, function() {

		setTimeout($.proxy(function () { 
			this.fix.append('<div id="' + this.idToCheck + '"></div>'); 
		}, this), this.threshold - 100);

		$.waitForElement(this.idToCheck, this.threshold).done(function () {
			ok(true);
			start();
		}).fail(function () {
			ok(false);
			start();
		});

	});

	asyncTest("fails if the element exists after the this.threshold", 1, function() {

		setTimeout($.proxy(function () { 
			this.fix.append('<div id="' + this.idToCheck + '"></div>'); 
		}, this), this.threshold + 50);

		$.waitForElement(this.idToCheck, this.threshold).done(function () {
			ok(false);
			start();
		}).fail(function () {
			ok(true);
			start();
		});

	});


	module('async: failure (not implemented) senarios', {

		setup: function() {
			this.startTime = +new Date();
			this.fix = $('#qunit-fixture');
			this.idToCheck = 'test-element';
			this.classToCheck = 'test-class';
			this.tagToCheck = 'canvas';
			this.threshold = 200;
		}

	});

	asyncTest("fails finding an element by class name", 1, function() {

		setTimeout($.proxy(function () { 
			this.fix.append('<div class="' + this.classToCheck + '"></div>'); 
		}, this), this.threshold - 100);

		$.waitForElement(this.classToCheck, this.threshold).done(function () {
			ok(false);
			start();
		}).fail(function () {
			ok(true);
			start();
		});

	});

	asyncTest("fails finding an element by tag name", 1, function() {

		setTimeout($.proxy(function () { 
			this.fix.append('<' + this.tagToCheck + '></' + this.tagToCheck + '>'); 
		}, this), this.threshold - 100);

		$.waitForElement(this.tagToCheck, this.threshold).done(function () {
			ok(false);
			start();
		}).fail(function () {
			ok(true);
			start();
		});

	});

	module('async: returned element', {

		setup: function() {
			this.startTime = +new Date();
			this.fix = $('#qunit-fixture');
			this.idToCheck = 'test-element';
			this.noelementid = 'noelement';
			this.threshold = 200;
		}

	});

	asyncTest("returns an element if found before the threshold", 1, function() {

		setTimeout($.proxy(function () { 
			this.fix.append('<div id="' + this.idToCheck + '"></div>'); 
		}, this), this.threshold - 100);

		$.waitForElement(this.idToCheck, this.threshold).done($.proxy(function (element) {
			deepEqual(element, $('#' + this.idToCheck)[0]);
			start();
		}, this)).fail(function () {
			ok(false);
			start();
		});

	});


})(jQuery);