// JS - Module Pattern

// An object 'budgetController' containing the method 'publicTest'

var budgetController = (function() {
    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        // This object is what gets assigned to the budgetController after function returns
        publicTest: function (b) {
            return add(b);
        }
    }
})();


