//setup express
const express = require('express');
//set up file system access
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const inventoryFilePath = path.join(__dirname, 'inventory.json');

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(__dirname));

//listen for express updates
app.listen(PORT, ()=>{
  console.log(`Listening at http://localhost:${PORT}/`);
})

//Get inventory json
app.get("/getInventory", function(req, res){
  console.log("getting inventory");
  //read file and store in variable to return
  var data = fs.readFileSync(inventoryFilePath, 'utf8');
  var inventoryData = JSON.parse(data);
  //return variable with file data
  res.json(inventoryData);
});

//add to json inventory file
app.post("/add", function(req, res){
  console.log("adding to inventory");
  const { date: newDate, itemName: item, quantity: newQuantity } = req.body;

  try {
    var data = fs.readFileSync(inventoryFilePath, 'utf8');
    var inventoryData = JSON.parse(data);
    //if same item name exists, add quantity to item && change date
    const foundItem = inventoryData.find(obj => obj.itemName.toLowerCase() === item.toLowerCase());

    //update quantity
    if(foundItem){
      foundItem.quantity = Number(foundItem.quantity) + Number(newQuantity);
      foundItem.date = newDate;
      console.log("Item found, updating item");
    }
    //else add new json object
    else{
      console.log("adding new item");
      inventoryData.push({
        "itemName": item,
        "date": newDate,
        "quantity": Number(newQuantity)
      });
    }
    fs.writeFileSync(inventoryFilePath, JSON.stringify(inventoryData, null, 2));
    res.send("Inventory updated successfully");
  } catch (err) {
    console.error("Error in /add route:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

//subtract from inventory file
app.post("/subtract", function(req, res){
  console.log("removing from inventory");
  
  const { date: newDate, itemName: item, quantity: newQuantity } = req.body;

  try {
    const data = fs.readFileSync(inventoryFilePath, 'utf8');
    let inventoryData = JSON.parse(data);

    //search for item name
    const index = inventoryData.findIndex(obj => obj.itemName.toLowerCase() === item.toLowerCase());

    // if same item name exists, subtract quantity from item && change date
    if(index !== -1){
      console.log("subtracting item quantity");

      const itemToUpdate = inventoryData[index];
      itemToUpdate.quantity = Number(itemToUpdate.quantity) - Number(newQuantity);
      itemToUpdate.date = newDate;

      if(itemToUpdate.quantity <= 0){
        //remove whole JSON object
        inventoryData.splice(index,1);
      }
      fs.writeFileSync(inventoryFilePath, JSON.stringify(inventoryData, null, 2));
      res.send("Item updated/removed successfully");
    }
    else{
      //else item not found error
      console.log("item not found, nothing subtracted");
      res.status(404).send("Item not found in inventory");
    }
  } catch (err) {
    console.error("Error in /subtract route:", err);
    res.status(500).send("Server error: " + err.message);
  }
});
