import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
  { id: 4, username: "haya", displayName: "Haya" },
  { id: 5, username: "omar", displayName: "Omar" },
  { id: 6, username: "lana", displayName: "Lana" },
];

//Two param
// 1- path
// 2- request handler
// 3- req => request object (request property all the stuff)
// 4- res => response object (the response u want
// to return back to clinet)
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello!" });
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // ceck if they are not defined

  if (filter && value)
    return res.send(mockUser.filter((user) => user[filter].includes(value)));
  return res.send(mockUser);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params); // /:id, maybe can have multiple /:id/:username

  // validation if id is vaild numeric string

  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad request" });

  const findUser = mockUser.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
