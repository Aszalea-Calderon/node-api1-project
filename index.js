const app = require("./api/server.js");

//Setting up the port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
//
