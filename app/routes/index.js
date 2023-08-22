var express = require("express");
var router = express.Router();
const user = require("../controllers/auth.controller")

/* GET home page. */
// Catch all other routes and return the index file
// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });
router.post(
  "/api/auth/signup",
  user.signup
);

module.exports = router;
