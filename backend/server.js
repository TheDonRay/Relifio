const express = require('express'); 
const app = express(); 

require('dotenv').config(); 

// set up middleware 
app.use(express.json()); 

const PORT = process.env.PORT;  

app.get('/', (req, res) => {
    res.json({ 
        BackendResponse: "server is running"
    }); 
}); 

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
