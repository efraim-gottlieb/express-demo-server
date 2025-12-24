import fs from "fs/promises";

const commentsPath = "data/comments.json";

async function readComments() {
  const comments = JSON.parse(await fs.readFile(commentsPath, "utf-8"));
  return comments;
}

export async function getComments(req, res) {
  const comments = await readComments();
  res.json(comments);
}



async function writeComments(comments) {
  await fs.writeFile(commentsPath, JSON.stringify(comments), null, 2);
}


