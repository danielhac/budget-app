// JS - Module Pattern

// An object 'budgetController' containing the method 'publicTest'

var budgetController = (function() {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        // public method which allows other modules to add new items to data structure
        addItem: function (type, des, val) {
            var newItem, ID;

            // Create a new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on type: 'inc' or 'exp'
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);

            // Allows access to the new item to other functions/modules
            return newItem
        },
        
        test: function () {
            console.log(data);
        }
    };

})();


var UIController = (function () {

    // Object properties that contains the classes
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getinput: function () {
            // Instead of returning the 3 variables, return an object containing 3 properties
            return {
                // Get value which is either 'income' or 'expense'
                type: document.querySelector(DOMstrings.inputType).value,
                // Get value of 'description'
                description: document.querySelector(DOMstrings.inputDescription).value,
                // Get value of 'value'
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        // Making 'DOMstrings' public
        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

// Wire up the controller below to create relations with above 2 controllers
var controller = (function (budgetCtrl, UICtrl) {

    // Wrapped code within setupEventListeners for organization and executed within 'init'
    var setupEventListeners = function () {
        // Get the public 'DOMstrings'
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            // if key press === enter or return
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        var input, newItem;

        // Get field input data
        input = UICtrl.getinput();

        // Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // Add item to UI


        // Calculate budget


        // Display budget in UI
    }

    return {
        init: function () {
            console.log('Started');
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();