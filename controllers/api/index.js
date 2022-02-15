const router = require("express").Router();
const coffeeRoutes = require("./coffee-routes");
const userRoutes = require("./user-routes");
const ingredientRoutes = require("./ingredient-routes");

//Prefix all routes
router.use("/coffee", coffeeRoutes);
router.use("/users", userRoutes);
router.use("/ingredients", ingredientRoutes);

module.exports = router;