/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const router = express.Router();

// router.get("/users", (req, res) => {
//   const users = [
//     { id: 1, name: "awais" },
//     { id: 2, name: "ali" },
//   ];
//   res.json(users);
// });

// router.get("/about", (req, res) => {
//   res.json("This is a about page");
// });

// router.get("/contact", (req, res) => {
//   const contact = [
//     { email: "awais6javaid@gmail.com" },
//     { phone: "03356620397" },
//   ];
//   res.json(contact);
// });

// router.get("/search", (req, res) => {
//   const query = req.query.q;
//   res.json(`the query ${query}`);
// });

router.post("/register", (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: "✅ User registered successfully!",
    user: { name, email },
  });
});

router.get("/:id", (req, res) => {
  const userid = req.params.id;
  res.json(`user ID ${userid}`);
});




module.exports = router;
