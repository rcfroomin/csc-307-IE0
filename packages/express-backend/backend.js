import express from "express";

const app = express();
const port = 8000;
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

    app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

const deleteUserById = (id) => 
    users["users_list"].filter((user) => user["id"] !== id);

    app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const newUsers = deleteUserById(id);
    if (newUsers.length === users["users_list"].length) {
        res.status(404).send("Resource not found.");
    } else {
        users["users_list"] = newUsers;
        res.send(users);
    }
});

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    console.log(req);
    addUser(userToAdd);
    res.send();
});
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
      res.send(users);
    }
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/", (req, res) => {
  res.send("Hello World! I'm Riley.");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
