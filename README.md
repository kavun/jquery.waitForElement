### jQuery.waitForElement ### [![Build Status](https://travis-ci.org/kavun/jquery.waitForElement.png?branch=master)](https://travis-ci.org/kavun/jquery.waitForElement)

jQuery plugin that resolves a [jQuery Deferred Promise][1] if an element is found by ID before a threshold timeout.
Returns the element if it is found.

```javascript
$.waitForElement('test-id', 5000 /* 5 sec */).done(function (element) {
	// found and returned element with id of 'test-id'
}).fail(function () {
	// element does not exist before threshold time limit
});
```

[1]: http://api.jquery.com/deferred.promise/