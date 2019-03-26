var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

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
    //     inquirer
    //       .prompt({
    //         name: "postOrBid",
    //         type: "list",
    //         message: "Would you like to [POST] an auction or [BID] on an auction?",
    //         choices: ["POST", "BID", "EXIT"]
    //       })
    //       .then(function(answer) {
    //         // based on their answer, either call the bid or the post functions
    //         if (answer.postOrBid === "POST") {
    //           postAuction();
    //         }
    //         else if(answer.postOrBid === "BID") {
    //           bidAuction();
    //         } else{
    //           connection.end();
    //         }
    //       });
    //   }


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
        console.log(table.toString())
    })
}