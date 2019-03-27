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

function start() {
    showProductsInStore()
    takingClientOrder()
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
var productsArray = []
function takingClientOrder() {
    var query = "SELECT product_name FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            productsArray.push(res[i].product_name)
        }
        askQuestions()
    })
}

function askQuestions() {
    inquirer
        .prompt({
            name: "buyProduct",
            type: "list",
            message: "What product would you like to buy?",
            choices: productsArray
        })
        .then(function (product) {
            var productName = product.buyProduct
            inquirer
                .prompt({
                    name: "buyQuantity",
                    type: "input",
                    message: "How many would you like to buy?"
                })
                .then(function (quantity) {
                    var query = "SELECT stock_quantity FROM products WHERE product_name = ?";
                    connection.query(query,
                        productName
                        ,
                        function (err, res) {
                            if (quantity.buyQuantity <= res[0].stock_quantity) {
                                console.log(chalk.magentaBright.bold("****************************************************************************************************"));
                                console.log(chalk.green.bold("Amazing! You have purchased " + quantity.buyQuantity + " items and are now a proud owner of the " + productName + " :)"))
                                var query = "SELECT price FROM products WHERE product_name = ?";
                                connection.query(query, productName, function (err, res) {
                                    var price = res[0].price
                                    var totalCost = quantity.buyQuantity * price
                                    console.log(chalk.green.bold("The Total Cost of your purchase was $" + totalCost + "."))
                                    console.log(chalk.green.bold("See our updated Store Directory below to help with your next purchase!"))
                                    console.log(chalk.magentaBright.bold("****************************************************************************************************"));
                                    var newQuantity = res[0].stock_quantity - quantity.buyQuantity
                                    var query = connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: newQuantity
                                            },
                                            {
                                                product_name: productName
                                            }
                                        ],
                                        function (err, res) {
                                        }
                                    )
                                })


                                start()
                            }
                            else {
                                console.log(chalk.green.bold("Insufficent Quantity! Try again :( "));
                                console.log(chalk.magentaBright.bold("****************************************************************************************************"));
                                takingClientOrder()
                            }
                        })
                })
        })
}


