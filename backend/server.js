require("dotenv").config();
// call mongodb connection
const dbConnection = require("./config/db.js");
dbConnection(); // call the db function here

const app = require("./app.js");

const PORT = process.env.PORT || 2400;

app.listen(PORT, () => {
  console.log(`Server is Online http://localhost:${PORT}`);
});
