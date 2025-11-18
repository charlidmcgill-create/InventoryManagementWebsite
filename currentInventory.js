document.addEventListener('DOMContentLoaded', () => {
    //send GET request
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/getInventory", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function(){
        if(xhr.status === 200){
            console.log("server connection successful", xhr.responseText);
            const inventory =  JSON.parse(xhr.responseText);
            outputTable(inventory);
        }else{
            console.error("Error: ", xhr.statusText);
        }
    };
    xhr.send();
});
//output json into table
function outputTable(jsonArray){
    const tableBody = document.getElementById("inventoryTable");
    tableBody.innerHTML = "";

    if (!jsonArray || jsonArray.length === 0) {
        tableBody.innerHTML = `
         <tr>
            <td colspan="3" style="text-align:center;">No inventory items found.</td>
         </tr>
        `;
        return;
    }

    //add row to tbody with id 'inventoryTable'}
    for(const obj of jsonArray){
        const row = document.createElement("tr");

        row.innerHTML = `
         <td>${obj.date}</td>
         <td>${obj.itemName}</td>
          <td>${obj.quantity}</td>
        `;

        tableBody.appendChild(row);
    }
}
