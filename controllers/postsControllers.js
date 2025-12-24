import fs from "fs/promises";

const postsPath = "data/posts.json";

async function readPosts() {
  const posts = JSON.parse(await fs.readFile(postsPath, "utf-8"));
  return posts;
}

export async function getPosts(req, res) {
  const posts = await readPosts();
  res.json(posts);
}

export async function getUserById(req, res) {
  const posts = await readPosts();
  const result = posts.find((user) => user.id === parseInt(req.params.id));
  if (!result) res.status(404).send(`id - ${req.params.id} not found`);
  res.json(result);
}

async function writePosts(posts) {
  await fs.writeFile(postsPath, JSON.stringify(posts), null, 2);
}

async function getNextId() {
  const posts = await readPosts();
  if (!posts || posts.length === 0) {
    return 1;
  }
  let maxValue = 0;
  posts.forEach((user) => {
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
  const posts = await readPosts();
  const userNames = posts.map((uaer) => uaer.username.toLowerCase());
  const userName = req.body.username;
  if (!userNames.includes(userName.toLowerCase())) {
    const { username, email, name } = req.body;
    const user = {
      id: await getNextId(),
      username,
      email,
      name,
    };
    posts.push(user);
    await writePosts(posts);
    res.status(201).json({ sucsses: user });
  } else {
    res.status(400).send("user name exists already...");
  }
}

export async function editUser(req, res) {
  const posts = await readPosts();
  const userIndex = posts.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) res.status(404).send("not found");
  else {
    const { username, email, name } = posts[userIndex];
    posts[userIndex].username = req.body.username || username;
    posts[userIndex].email = req.body.email || email;
    posts[userIndex].name = req.body.name || name;
    await writePosts(posts);
    res.status(200).json({ sucsses: posts[userIndex] });
  }
}

export async function deleteUser(req, res) {
  const posts = await readPosts();
  const userIndex = posts.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) res.status(404).send("not found");
  else {
    posts.splice(userIndex, 1);
    writePosts(posts);
    res.send('deleted')
  }
}

