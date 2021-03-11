// Imports at top
const express = require("express");
const theModel = require("./users/model.js");

//Instance of Express app
const server = express();

//Global Middleware
server.use(express.json());

//End points
// [GET] / (Welcome endpoint)
server.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// [POST] (C of CRUD, create new user from JSON Payload)
server.post("/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "Name and bio required" });
  } else {
    try {
      const newUser = await theModel.insert(user);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
});

//[GET] (R of CRUD, fetch all users)
server.get("/users", async (req, res) => {
  try {
    const use = await theModel.find();
    res.json(use);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//[GET] (R of CRUD, fetch single users)
server.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const use = await theModel.findById(id);
    if (use) {
      res.json(use);
    } else {
      res.status(404).json({ message: "Incorrect Id" });
    }
    res.json(use);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// [DELETE] (D of CRUD, remove it with id
server.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const use = await theModel.remove(id);
    if (use) {
      res.json(use);
    } else {
      res.status(404).json({ message: "bad id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//[Put] (U of CRUD, update)

server.put("users/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updateUser = await theModel.update(id, user);
    {
      if (updateUser) {
        res.json(updateUser);
      } else {
        res.status(404).json({ message: "bad id" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
//Export at the bottom
module.exports = server;

// //Imports
// const express = require("express");
// // const shortid = require("shortid").generate;
// const model = require("./users/model.js");

// //Express
// const app = express();
// app.use(express.json());

// console.log("hello");
// //Starting user
// // const initializeUsers = [
// //   { id: shortid.generate(), name: "Ed Carter", bio: "hero" },
// //   { id: shortid.generate(), name: "Mary Edwards", bio: "super hero" },
// // ];

// //Getting the data
// app.get("/folks", async (req, res) => {
//   res.status(200).json(await model.find());
// });

// // //Getting specific user
// app.get("/folks/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const folk = await model.findById(id);
//     if (folk) {
//       res.json(folk);
//     } else {
//       res.status(404).json({ message: `Error, incorrect id ${folk}` });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err });
//   }

//   // const folks = await model.findById((user) => user.id === id);

//   // if (!folks) {
//   //   res.status(404).json(await { message: `ID: ${id} does not exist` });
//   // } else {
//   //   res.status(200).json(folks);
//   // }
//   // res.status(200).json(folks);
// });

// // //POSTING DATA
// // app.post("/folks", (req, res) => {
// //   const { name, bio } = req.body;
// //   console.log(name, bio);
// //   if (!name || !bio) {
// //     res.status(400).json({ message: "Name and role are required" });
// //   } else {
// //     const newFolks = { id: shortid(), name, bio };
// //     initializeUsers.push(newFolks);
// //     res.status(201).json(newFolks);
// //   }
// // });

// //Catch all
// app.get("*", (req, res) => {
//   res.status(404).json({ message: "404 Not found" });
// });

// //Gets the app listening
// module.exports = app;
