### jQuery.waitForElement ###

jQuery plugin that resolves a [jQuery Deferred Promise][1] if an element is found by ID before a threshold timeout

```javascript
$.waitForElement('test-id', 5000 /* 5 sec */).done(function () {
	// found element with id of 'test-id'
}).fail(function () {
	// element does not exist before threshold time limit
});
```

[1]: http://api.jquery.com/deferred.promise/