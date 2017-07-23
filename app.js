// JS - Module Pattern

// An object 'budgetController' containing the method 'test'

var budgetController = (function() {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // Creating prototype since all objects created through expense prototype will inherit this method
    Expense.prototype.calcPercentage = function (totalIncome) {
        if(totalIncome > 0) {
            // Calculating percentage by dividing current value by totalIncom
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        // Retrieve percentage
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        // Loop through array 'type'
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        // Update 'data.totals' object
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // Set as -1 as it is non-existent
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

        deleteItem: function (type, id) {
            // Cannot simply delete with code below because it may not be in order of array
            // data.allItems[type][id]

            var ids, index;

            // map is similar to foreach but it creates a new array
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            // Selects the actual index of the array based on the number or 'id' as selected as below
            index = ids.indexOf(id);

            // If index exists...
            if (index !== -1) {
                // Delete the index and the 1 params is how many to splice
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function () {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate % of income
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            // Loop through all expense and calculate percentages
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            // Loop through all expenses and return calculated percentages
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
    };

    return {
        getinput: function () {
            // Instead of returning the 3 variables, return an object containing 3 properties
            return {
                // Get value which is either 'income' or 'expense'
                type: document.querySelector(DOMstrings.inputType).value,
                // Get value of 'description'
                description: document.querySelector(DOMstrings.inputDescription).value,
                // Get value of 'value' - convert string to number
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function (obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> ' +
                    '<div class="item__description">%description%</div> <div class="right clearfix"> ' +
                    '<div class="item__value">%value%</div> <div class="item__delete"> ' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"> ' +
                    '<div class="item__description">%description%</div> ' +
                    '<div class="right clearfix"> <div class="item__value">%value%</div> ' +
                    '<div class="item__percentage">21%</div> <div class="item__delete"> ' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Delete an exp or inc in UI
        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields, fieldsArr;
            // Selects both the description and the value as user inputs (defaults to a list)
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // Convert 'fields' to array and slice
            fieldsArr = Array.prototype.slice.call(fields);

            // Loop through array and clear each one
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            // Focus back to 'description' after submitting data
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function (percentages) {
            // Node list
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            // Resuable forEach function
            var nodeListForEach = function (list, callback) {
                for (var i=0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            // Using the forEach function above
            nodeListForEach(fields, function (current, index) {
                if(percentages[index] > 0) {
                    // Loop through each index and display percentages in UI
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        formatNumber: function(num, type) {

            var numSplit, int, dec;
            num = Math.abs(num); // absolute value
            num = num.toFixed(2); // round to 2 decimal places

            numSplit = num.split('.'); // split
            int = numSplit[0];
            // If int is 1000 or more, add comma in appropriate place
            if(int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length -3, 3);
            }
            dec = numSplit[1];

            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
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

        // Set up event listener to a parent element
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function () {
        // 5a. Calculate budget
        budgetCtrl.calculateBudget();

        // 5b. Return the budget
        var budget = budgetCtrl.getBudget();

        // 5c. Display budget in UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update UI
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get field input data
        input = UICtrl.getinput();

        // If not empty or NaN
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }

    };

    // Event: target element
    var ctrlDeleteItem = function (event) {
        // event.target: each time we click on anything in the webpage, will log the target element
        console.log(event.target);
        // event.target.parentNode: each time we click on anything in the webpage, will log the parent target element
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);

        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            // Split strings into array - ex: (inc-100) will be [inc, 100]
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        }

        // 1. Delete item from data structure
        budgetCtrl.deleteItem(type, ID);

        // 2. Delete item from UI
        UICtrl.deleteListItem(itemID);

        // 3. Update and show new budget
        updateBudget();

        // 4. Calculate and update percentages
        updatePercentages();
    };

    return {
        init: function () {
            console.log('Started');
            // Reset every UI to zero
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();