import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  const category = req.body.category;
  const type = req.body.type;
  try {
    const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}`, {
      params: {
        type: type,
        blacklistFlags: "nsfw,racist,sexist,explicit",
      },
    });
    res.render("index.ejs", { joke: result.data });
  } catch (error) {
    res.render("index.ejs", { error: "Failed to fetch joke" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
