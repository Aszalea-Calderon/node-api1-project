const express = require("express");
const generate = require("shortid").generate;

const app = express();
app.use(express.json());
const server = require("./api/server");

const port = 5000;

//Starting data//
let datData = [
  { id: generate(), name: "Jane Doe", bio: "Having fun" },
  { id: generate(), name: "Don Doe", bio: "Doing my thing" },
];

app.listen(port, () => {
  console.log(`Server is on port: ${port}`);
});
