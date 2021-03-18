// BUILD YOUR SERVER HERE
//Imports at the top

const express = require("express");

//Instance
const server = express();
server.use(express.json());
const theModel = require("./users/model");

//Global Middleware

//Endpoints

//[Get] Hello world
server.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// | GET | /api/users     | Returns an array users.     (R in Crud)
server.get("/api/users", async (req, res) => {
  try {
    const users = await theModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// | GET    | /api/users/:id | Returns the user object with the specified `id`.
server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await theModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "That id doesn't work" });
    }
    // res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//| POST   | /api/users    [C in CRUD] | Creates a user using the information sent inside the `request body`.
server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "Name and Bio are required" });
  } else {
    try {
      const newUser = await theModel.insert(user);
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
});

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await theModel.remove(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Invalid Id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updateUser = await theModel.update(id, user);
    if (updateUser) {
      res.json(updateUser);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
//next tim eyou are sad, I would love to at least hear you out
