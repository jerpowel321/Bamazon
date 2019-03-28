# Bamazon Store :department_store: :crown: :boot:

## Introduction

<b>Welcome to my shop!</b>
#### Here you will find the latest fashion for cheap prices! My app has two displays, one for customers and one for managers. 

### For Customers

<b>At the start of my webpage, you will see a prompt on the screen displaying two messages:</b>

1) What product would you like to buy?
    - A menu of available products is shown for the customer to select.
2) How many would you like to buy? 
    - The customer will input the quantity they would like to purchase.

Once the customer has placed their order, the application checks if the store has enough of the product to meet the customer's request.

If the store cannot fulfil the customer's request, the app will display the following message _Insufficent Quantity! Try again :(_, and prevents the order from going through.

If the store has enough of the product the user wishes to order, the order is fulfilled. 
The store SQL database is then updated to reflect the remaining quantity and the customer is shown the total cost of their purchase and will be shown the original prompt for additional purchases.

#### See demo below of how a customer places an order and how the Store Database is updated to reflect that order.
<img src="https://media.giphy.com/media/26SblKp9oQwdqXDEQI/giphy.gif" width="500">

### For Managers

#### At the start of my webpage, you will see a prompt on the screen displaying possible actions:

1) View Products for Sale
    - Allows the Manager to view products available for sale in the store (product ID, product name, department name, price and quantity available)
2) View Low Inventory
    - Allows the Manager to view products in the store with available quantity of less than 20.
3) Add to Inventory
    - Allows the Manager to restock current products in the store.
4) Add New Product
    - Allows the Manager to add new products to the store.
5) Remove Product
    - Allows the Manager to remove products from the store.
5) Exit
    - Allows the Manager to exit out of the application.

#### See demo below of how a manager can view, add, remove and restock products in the store.  
<img src="https://media.giphy.com/media/cmynL8Afrg6pdpv8MY/giphy.gif" width="500">
<img src="https://media.giphy.com/media/mxSYpbCWQFQAMh9oOU/giphy.gif" width="500">

## Deployed Site
Use this link to see the deployed site: https://jerpowel321.github.io/Bamazon/

## Built With
- JavaScript
- mySQL
- NPM packages
    * mySQL
    * Inquirer
    * Cli-table2
    * Chalk

## Authors
Jennifer Powell 