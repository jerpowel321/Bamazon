# Bamazon Store :department_store: :crown: :boot:

## Welcome to my shop!

#### Here you will find the latest fashion for cheap prices!
#### My app has two displays, one for customers and one for managers. 

## For Customers

#### At the start of my webpage, you will see a prompt on the screen displaying two messages:

1) What product would you like to buy?
- A menu of available products is shown for the customer to select.
2) How many would you like to buy? 
- The customer will input the quantity they would like to purchase.

Once the customer has placed their order, the application checks if the store has enough of the product to meet the customer's request.

If the store cannot fulfil the customer's request, the app will display the following message *Insufficent Quantity! Try again :( *, and prevents the order from going through.

If the store has enough of the product the user wishes to order, the order is fulfilled. 
The store SQL database is then updated to reflect the remaining quantity and the customer is shown the total cost of their purchase. 

#### See demo below of how a customer places an order and how the Store Database is updated to reflect that order.
<img src="" width="500">

## For Managers

#### At the start of my webpage, you will see a prompt on the screen displaying possible actions:

1) View Products for Sale
2) View Low Inventory
3) Add to Inventory
4) Add New Product
5) Exit

### See what each of the following commands does:
1) On the first command, <b>View Products for Sale</b>
    - The user is prompted *"Name an artist you'd like to see in concert :)"*
   
    
#### See Demo of first command:
<img src="" width="500">

2) On the second command, <b>View Low Inventory</b>
    

#### See Demo of second command:
<img src="" width="500">

3) On the third command, <b>Add to Inventory</b>
   

#### See Demo of third command:
<img src="" width="500">

4) On the fourth command, <b>Add New Product</b>
 

#### See Demo of fourth command:
<img src="" width="500">

5) On the fith command, <b>Exit</b>
    - You will exit out of the store and receive the following message: 
    *"Goodbye, have a nice day! :)"*

## Built With
- JavaScript
- Node packages
    * mysql
    * inquirer
    * cli-table2
    * chalk

## Authors
Jennifer Powell 