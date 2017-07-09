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


var UIController = (function () {


})();

// Wire up the controller below to create relations with above 2 controllers
var controller = (function (budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function () {
            console.log(z);
        }
    }

})(budgetController, UIController);