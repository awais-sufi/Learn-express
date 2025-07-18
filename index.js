const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");

const PORT = 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// const userRoutes = require("./routes/user");
// app.use("/user", userRoutes);

// const productRoutes = require("./routes/product");
// app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.post("/users", async (req, res) => {
  try {
    console.log("📦 Incoming data:", req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route: Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route: Get a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Route: Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Route: Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

mongoose
  .connect(process.env.MONGO_URI) // Or MongoDB Atlas URL
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
