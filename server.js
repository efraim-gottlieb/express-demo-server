import express from "express";
import userRoutes from './routes/usersRoutes.js'
import commentsRoutes from './routes/commentsRoutes.js'
import postsRoutes from './routes/postsRoutes.js'

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running", version: "1.0.0" });
  console.log(req);
});

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
