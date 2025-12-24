import fs from "fs/promises";

const postsPath = "data/posts.json";

export async function readPosts() {
  const posts = JSON.parse(await fs.readFile(postsPath, "utf-8"));
  return posts;
}

export async function writePosts(posts) {
  await fs.writeFile(postsPath, JSON.stringify(posts), null, 2);
}
