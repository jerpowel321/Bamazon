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

    inquirer
        .prompt({
            name: "managerDisplay",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (res) {
            if (res.managerDisplay === "View Products for Sale") {
                console.log("The table below displays the available products in the store.")
                showProductsInStore()
            }
            if (res.managerDisplay === "View Low Inventory") {
                console.log("The table below displays the products with low inventory (less than 20) in the store.")
                showLowInventory()
            }
            if (res.managerDisplay === "Add to Inventory") {

            }
            if (res.managerDisplay === "Add New Product") {

            }
            // var productName = product.buyProduct
            // inquirer
            //     .prompt({
            //         name: "buyQuantity",
            //         type: "input",
            //         message: "How many would you like to buy?"
            //     })
            //     .then(function (quantity) {
            //         var query = "SELECT stock_quantity FROM products WHERE product_name = ?";
            //         connection.query(query,
            //             productName
            //             ,
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
    start()
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
    });
    start()
}
