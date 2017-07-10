// JS - Module Pattern

// An object 'budgetController' containing the method 'publicTest'

var budgetController = (function() {

})();


var UIController = (function () {


})();

// Wire up the controller below to create relations with above 2 controllers
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        // Get field input data


        // Add item to budget controller


        // Add item to UI


        // Calculate budget


        // Display budget in UI
        console.log('Clicked the add__btn or ENTER pressed');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        // if key press === enter or return
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);