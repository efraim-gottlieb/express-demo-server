import fs from "fs/promises";
const usersPath = "data/users.json";

async function readUsers() {
  const users = JSON.parse(await fs.readFile(usersPath, "utf-8"));
  return users;
}

export async function getUsers(req, res) {
  const users = await readUsers();
  res.json(users);
}

export async function getUserById(req, res) {
  const users = await readUsers();
  const result = users.find((user) => user.id === parseInt(req.params.id));
  if (!result) res.status(404).send(`id - ${req.params.id} not found`);
  res.json(result);
}

async function writeUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users), null, 2);
}

async function getNextId() {
  const users = await readUsers();
  if (!users || users.length === 0) {
    return 1;
  }
  let maxValue = 0;
  users.forEach((user) => {
    if (user.id > maxValue) {
      maxValue = user.id;
    }
  });
  return maxValue + 1;
}

export async function addUser(req, res) {
  if (!(req.body.username && req.body.email && req.body.name)) {
    res.status(400).send("body error");
    return;
  }
  const users = await readUsers();
  const userNames = users.map((uaer) => uaer.username.toLowerCase());
  const userName = req.body.username;
  if (!userNames.includes(userName.toLowerCase())) {
    const { username, email, name } = req.body;
    const user = {
      id: await getNextId(),
      username,
      email,
      name,
    };
    users.push(user);
    await writeUsers(users);
    res.status(201).json({ sucsses: user });
  } else {
    res.status(400).send("user name exists already...");
  }
}

export async function editUser(req, res) {
  const users = await readUsers();
  const userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) res.status(404).send("not found");
  else {
    const { username, email, name } = users[userIndex];
    users[userIndex].username = req.body.username || username;
    users[userIndex].email = req.body.email || email;
    users[userIndex].name = req.body.name || name;
    await writeUsers(users);
    res.status(200).json({ sucsses: users[userIndex] });
  }
}

export async function deleteUser(req, res) {
  const users = await readUsers();
  const userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) res.status(404).send("not found");
  else {
    users.splice(userIndex, 1);
    writeUsers(users);
    res.send('deleted')
  }
}

