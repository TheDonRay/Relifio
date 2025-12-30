require("dotenv").config();
// call mongodb connection
const dbConnection = require("./config/db.js");
dbConnection();

const app = require("./app.js");

const PORT = process.env.PORT || 2400;

app.listen(PORT, () => {
  console.log(`Server is Online http://localhost:${PORT}`);
});
