const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboard = require("./dashboardRoutes");



router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboard);


module.exports = router;

