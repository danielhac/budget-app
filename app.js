// JS - Module Pattern

// An object 'budgetController' containing the method 'publicTest'

var budgetController = (function() {

})();


var UIController = (function () {

    return {
        getinput: function () {
            // Instead of returning the 3 variables, return an object containing 3 properties
            return {
                // Get value which is either 'income' or 'expense'
                type: document.querySelector('.add__type').value,
                // Get value of 'description'
                description: document.querySelector('.add__description').value,
                // Get value of 'value'
                value: document.querySelector('.add__value').value
            };
        }
    };

})();

// Wire up the controller below to create relations with above 2 controllers
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        // Get field input data
        var input = UICtrl.getinput();
        console.log(input);

        // Add item to budget controller


        // Add item to UI


        // Calculate budget


        // Display budget in UI
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        // if key press === enter or return
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);