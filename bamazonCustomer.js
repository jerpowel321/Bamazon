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
        .prompt([{
            name: "buyProduct",
            type: "list",
            message: "What product would you like to buy?",
            choices: productsArray
        },
        {
            name: "buyQuantity",
            type: "input",
            message: "How many would you like to buy?"
        }
        ])
        .then(function (res) {
            var productName = res.buyProduct
            var quantity = res.buyQuantity
            var query = "SELECT stock_quantity, price FROM products WHERE product_name = ?";
            connection.query(query,
                productName,
                function (err, res) {
                    if (quantity <= res[0].stock_quantity) {
                        var price = res[0].price
                        var totalCost = quantity * price
                        displayBorder()
                        console.log(chalk.green.bold("Amazing! You have purchased " + quantity + " items and are now a proud owner of the " + productName + " :)"))
                        console.log(chalk.green.bold("The Total Cost of your purchase was $" + totalCost + "."))
                        console.log(chalk.green.bold("See our updated Store Directory below to help with your next purchase!"))
                        displayBorder()
                        var newQuantity = res[0].stock_quantity - quantity
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

                        start()
                    }
                    else {
                        console.log(chalk.green.bold("Insufficent Quantity! Try again :( "));
                        displayBorder()
                        takingClientOrder()
                    }
                })
        })
}

function displayBorder() {
    console.log(chalk.magentaBright.bold("****************************************************************************************************"));
}