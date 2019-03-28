var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var chalk = require('chalk');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    //port
    port: 3306,
    //username
    user: "root",
    //password
    password: "password",
    database: "bamazon_DB"
});
// connecting to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // runing the start function after the connection is made to prompt the user
    start();
});

// function which prompts the manager for available actions
function start() {
    inquirer
        .prompt({
            name: "managerDisplay",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Remove Product", "Exit"]
        })

        .then(function (res) {
            // based on their selection, call on the ShowProductsInStore, ShowLowInventory, addToInventory, addNewProduct and connection.end functions
            if (res.managerDisplay === "View Products for Sale") {
                printBorder();
                console.log(chalk.green.bold("The table below displays the available products in the store."))
                printBorder();
                showProductsInStore(true)
            }
            if (res.managerDisplay === "View Low Inventory") {
                printBorder();
                console.log(chalk.green.bold("The table below displays the products with low inventory (less than 20) in the store."))
                printBorder();
                showLowInventory()
            }
            if (res.managerDisplay === "Add to Inventory") {
                printBorder();
                console.log(chalk.green.bold("Take a look at the current inventory below. Select the product name and input the restock amount to update store Inventory."))
                printBorder();
                addToInventory()
            }
            if (res.managerDisplay === "Add New Product") {
                addNewProduct()
            }
            if (res.managerDisplay === "Remove Product") {
                removeFromInventory()
            }
            if (res.managerDisplay === "Exit") {
                printBorder();
                console.log(chalk.green.bold("Goodbye, have a nice day! :)"))
                printBorder();
                connection.end();
            }
        })
}

// function to simplify js code displaying the border to the console
function printBorder() {
    var border = "****************************************************************************************************"
    console.log(chalk.magentaBright.bold(border));
}

// function to query the database for all items being offered by the store and pass the response to printProductTable function
function showProductsInStore(restart) {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        printProductTable(res, restart);
    })
}

// function to query the database for all items being offered by the store with inventory quantity of less than 20 and pass the response to printProductTable function. It also passes true to restart so the conditional restart is set to true and the start function will be executed
function showLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 20";
    connection.query(query, function (err, res) {
        printProductTable(res, true);
    });
}

// function to display the store products using cli-table2 to style the table
function printProductTable(res, restart) {
    var table = new Table({
        head: ['Item#', 'Product Name', 'Department', 'Price', 'Available Quantity']
        , colWidths: [10, 20, 15, 10, 20]
    });
    for (var i = 0; i < res.length; i++) {
        table.push(
            [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    }
    console.log(chalk.bgGreenBright(table.toString()))
    if (restart) {
        // re-prompt the manager for available actions
        start();
    }
}

// function to fetch product names currently available in the store and pass the array of values to the quantityToAdd function
function addToInventory() {
    showProductsInStore(false)
    var query = "SELECT product_name FROM products";
    connection.query(query, function (err, res) {
        var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name)
        }
        quantityToAdd(products);
    })
}

// function to handle posting updated inventory quantities to the store 
function quantityToAdd(products) {
    inquirer
        .prompt([{
            name: "productName",
            type: "list",
            message: "Which product would you like to update?",
            choices: products
        },
        {
            name: "addQuantity",
            type: "input",
            message: "Restock Quantity?"
        }])
        .then(function (product) {
            var productName = product.productName;
            var productQuantity = product.addQuantity;
            if (productQuantity <= 0) {
                printBorder()
                console.log(chalk.green.bold("Quantity to add must be positive!"))
                printBorder()
                quantityToAdd()
                return;
            }
            // function to query the database for the stock quantity from the product selected
            var query = "SELECT stock_quantity FROM products WHERE product_name = ?";
            connection.query(query,
                productName
                ,
                function (err, res) {
                     // when finished prompting, take the stock quantity in the database of the selected item and add it to the amount of restock.
                    var updatedQuantity = res[0].stock_quantity + parseFloat(productQuantity)
                    printBorder();
                    console.log(chalk.green.bold("There was " + res[0].stock_quantity + " " + productName + " in Inventory."));
                    console.log(chalk.green.bold("You have added " + parseFloat(productQuantity) + " " + productName + " to Inventory."))
                    console.log(chalk.green.bold("Total " + productName + " in inventory is now " + updatedQuantity + "."))
                    printBorder();
                    // function to handle posting updated inventory quantities to the store 
                    var query = "UPDATE products SET ? WHERE ?";
                    connection.query(query,
                        [{
                            stock_quantity: updatedQuantity
                        },
                        {
                            product_name: productName
                        }
                        ],
                        function (err, res) {
                            start()

                        })
                })
        });
}

// function to handle posting new products to the store 
function addNewProduct() {
    // prompt for info about the new item being offered by the store
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Name of product: "
            },
            {
                name: "department",
                type: "input",
                message: "Department product belongs to: "
            },
            {
                name: "price",
                type: "input",
                message: "Price of product: "
            },
            {
                name: "quantity",
                type: "input",
                message: "Quantity of product available for sale: "
            }

        ])
        .then(function (newItem) {
            // when finished prompting, insert a new item into the db with that info
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
            connection.query(query, [[
                [newItem.name, newItem.department, parseFloat(newItem.price), parseFloat(newItem.quantity)]]
            ],
                function (err, res) {
                    // display products available in the store 
                    showProductsInStore(true)
                }

            )
        })

}

// function to fetch product names currently available in the store and pass the array of values to the removeProduct function
function removeFromInventory() {
    showProductsInStore(false)
    var query = "SELECT product_name FROM products";
    connection.query(query, function (err, res) {
        var productNames = [];
        for (var i = 0; i < res.length; i++) {
            productNames.push(res[i].product_name)
        }
        removeProduct(productNames)
    })
}

// function to handle removing products from the store 
function removeProduct(productNames) {
    inquirer
        .prompt(
            {
                name: "name",
                type: "list",
                message: "What product would you like to remove?",
                choices: productNames
            }
        )
        .then(function (removeItem) {
            // when finished prompting, remove data for the selected product from the database 
            var query = "DELETE FROM products WHERE product_name = ?";
            connection.query(query, [[
                [removeItem.name]]
            ],
                function (err, res) {
                    // display products available in the store 
                    showProductsInStore(true)
                }

            )
        })

}
