const express = require('express');
const axios = require('axios');

const app = express();
// Parse JSON bodies for this app.
app.use(express.json());

app.post('*', function(request, response){
    data = request.body;

    // dubug purpose: show in console raw data received
    console.log("Request received: \n"+JSON.stringify(data, null, 2));

    // get the name of the action that triggered this request (add, update, delete, test)
    const action = data.___orca_action

    // get the name of the sheet this action impacts
    const sheetName = data.___orca_sheet_name

    // get the email of the user who preformed the action (empty if not HTTPS)
    const userEmail = data.___orca_user_email

    // NOTE:
    // orca system fields start with ___
    // you can access the value of each field using the field name (data.Name, data.Barcode, data.Location)
    switch (action) {
        case "add":
            // TODO: do something when a row has been added
            break;
        case "update":
            // TODO: do something when a row has been updated
            break;
        case "delete":
            // TODO: do something when a row has been deleted
            break;
        case "test":
            // TODO: do something when the user in the web app hits the test button
            break;
      }

    response.sendStatus(200);
});

async function webhook_in(){
    // The following example adds a new row to a sheet, setting the value of Barcode, Name, Quantity and Description
    // TODO: change url to https://api.orcascan.com/sheets/{id}
    const json = JSON.stringify(
            { 
                "___orca_action": "add",
                "Barcode": "0123456789",
                "Name": "New 1",
                "Quantity": 12,
                "Description": "Add new row example"
            }
        );
    const res = await axios.post("https://httpbin.org/post", json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
    
    res.data.data;
    console.log(res.data.data);
}

webhook_in()
app.listen(3000, () => console.log('Example app is listening on port 3000.'));