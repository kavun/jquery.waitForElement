/*  resolves if element is visible
    returns a jQuery.Deferred().promise()
    fails if it processes longer than threshold (default: 1000ms) */
;(function ($, undefined) {
    $.waitForElement = function (elementID, threshold) {

        var d = $.Deferred(),
            start = +new Date,
            threshold = threshold || 1000;

        function pollElement() {
            var element = document.getElementById(elementID);
            if (checkTime(d)) {
                if (element) {
                    if (!$(element).is(':visible')) {
                        setTimeout(pollElement, 0);
                    } else {
                        d.resolve(element);
                    }
                } else {
                    setTimeout(pollElement, 0);
                }
            }
        }

        function checkTime(d) {
            if ( ((+new Date) - start) > threshold ) {
                d.reject();
                return false;
            } else {
                return true;
            }
        }

        pollElement();

        return d.promise();
    }
})(jQuery);