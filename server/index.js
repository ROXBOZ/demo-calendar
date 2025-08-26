require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const FormSchema = new mongoose.Schema({
  title: String,
  weekDay: Number,
  duration: Number,
  level: Number,
  startTime: String,
  minAge: Number,
  openToAll: Boolean,
  trainers: [String],
  room: Number,
});
const Form = mongoose.model("Form", FormSchema);

app.post("/api/form", async (req, res) => {
  try {
    console.log("Incoming POST:", req.body);
    const form = new Form(req.body);
    await form.save();
    res.status(200).json({ message: "Form submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.get("/api/form", (req, res) => {
  res.send("GET route working");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
