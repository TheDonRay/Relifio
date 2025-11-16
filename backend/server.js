const express = require('express'); 
const app = express(); 
require('dotenv').config();  

//import routes here as such  
const signupRoute = require("./routes/signedup.js"); 

// set up middleware 
app.use(express.json()); 

const PORT = process.env.PORT;  
 
app.get('/', (req, res) => {
    res.json({ 
        BackendResponse: "server is running"
    }); 
});  

//mount route here to the expressApp as such 
app.use('/api/', signupRoute); 

app.listen(PORT, () => {
    console.log(`Server is Successfully running on the following localhost: http://localhost:${PORT}`);
});
