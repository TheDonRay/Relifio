const express = require('express'); 
const signupRoute = express.Router(); 

//going to be a backend post request that will be sent to my database  
signupRoute.post('/signup', async (req, res) => { 
    try { 
        //TODO: implement the sign up page for users to be able to sign up for relief.io and send it to the mongo database 
        //for now we can have this: 
        const TemPData = { 
            message: "set up database and data to be pushed into the database upon user signing up"
        }; 
        res.status(200).send(TemPData);  

    } catch (error){ 
        console.status(500).send('Error with sending Data to the database', error); 
    }
}); 

