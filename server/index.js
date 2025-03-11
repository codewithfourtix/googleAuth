import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { email, name, picture } = response.data;

    const userToken = jwt.sign(
      { email, name, picture },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.json({ token: userToken });
  } catch (err) {
    res.status(400).json({ message: "Invalid" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
