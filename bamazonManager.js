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
var border = "****************************************************************************************************"
function start() {

    inquirer
        .prompt({
            name: "managerDisplay",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        })
        .then(function (res) {
            if (res.managerDisplay === "View Products for Sale") {
                console.log(chalk.magentaBright.bold(border));
                console.log(chalk.green.bold("The table below displays the available products in the store."))
                console.log(chalk.magentaBright.bold(border));
                showProductsInStore()
            }
            if (res.managerDisplay === "View Low Inventory") {
                console.log(chalk.magentaBright.bold(border));
                console.log(chalk.green.bold("The table below displays the products with low inventory (less than 20) in the store."))
                console.log(chalk.magentaBright.bold(border));
                showLowInventory()
            }
            if (res.managerDisplay === "Add to Inventory") {
                console.log(chalk.magentaBright.bold(border));
                console.log(chalk.green.bold("Take a look at the current inventory below. Select the product name and input the restock amount to update store Inventory."))
                console.log(chalk.magentaBright.bold(border));
                addToInventory()


            }
            if (res.managerDisplay === "Add New Product") {
                addNewProduct()
            }
            if (res.managerDisplay === "Exit") {
                console.log(chalk.magentaBright.bold(border));
                console.log(chalk.green.bold("Goodbye, have a nice day! :)"))
                console.log(chalk.magentaBright.bold(border));
            }
        })
}


function showProductsInStore() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
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
    })
}

function showLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <=10";
    connection.query(query, function (err, res) {
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
        start()
    });
}

var productsArray = []
function addToInventory() {
    showProductsInStore()
    var query = "SELECT product_name FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            productsArray.push(res[i].product_name)
        }
        quantityToAdd()
    })
}

function quantityToAdd() {
    inquirer
        .prompt({
            name: "productName",
            type: "list",
            message: "Which product would you like to update?",
            choices: productsArray
        })
        .then(function (product) {
            var productName = product.productName
            inquirer
                .prompt({
                    name: "addQuantity",
                    type: "input",
                    message: "Restock Quantity?"

                })
                .then(function (quantity) {
                    var query = "SELECT stock_quantity FROM products WHERE product_name = ?";
                    connection.query(query,
                        productName
                        ,
                        function (err, res) {
                            var updatedQuantity = res[0].stock_quantity + parseFloat(quantity.addQuantity)
                            console.log(chalk.magentaBright.bold(border));
                            console.log(chalk.green.bold("There was " + res[0].stock_quantity + " " + productName + " in Inventory."));
                            console.log(chalk.green.bold("You have added " + parseFloat(quantity.addQuantity) + " " + productName + " to Inventory."))
                            console.log(chalk.green.bold("Total " + productName + " in inventory is now " + updatedQuantity + "."))
                            console.log(chalk.magentaBright.bold(border));
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
                                    showProductsInStore()

                                })
                        })
                });
        })
}

function addNewProduct() {
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
        .then(function(newItem){
            var query = "INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?)";
                    connection.query(query,
                        {
                            id: 11
                        },
                        {
                            product_name: newItem.name
                        },
                        {
                            department_name: newItem.department
                        },
                        {
                            price: newItem.price
                        },
                        {
                            stock_quantity: newItem.quantity
                        },
                        function(err, res){
                         
                            
                            
                        }
                        
                    )
        })

}

