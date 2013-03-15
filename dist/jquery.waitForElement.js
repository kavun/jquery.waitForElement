/*! jquery.waitForElement - v0.1.0 - 2013-03-15
* https://github.com/kavun/jquery.waitForElement
* Copyright (c) 2013 kavun; Licensed MIT */
;(function ($, undefined) {
    $.waitForElement = function (elementID, thresh) {

        var d = $.Deferred(),
            start = +new Date(),
            threshold = thresh || 1000,
            _document = document,
            _setTimeout = setTimeout;

        function pollElement() {
            var element = _document.getElementById(elementID);
            if (checkTime(d)) {
                if (element) {
                    if (!$(element).is(':visible')) {
                        _setTimeout(pollElement, 0);
                    } else {
                        d.resolve(element);
                    }
                } else {
                    _setTimeout(pollElement, 0);
                }
            }
        }

        function checkTime(d) {
            if ( ((+new Date()) - start) > threshold ) {
                d.reject();
                return false;
            } else {
                return true;
            }
        }

        pollElement();

        return d.promise();
    };
})(jQuery);