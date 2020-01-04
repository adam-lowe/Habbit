const router = require("express").Router();
const todosRoutes = require("./todos");
const petsRoutes = require("./pets");
// Book routes
router.use("/todos", todosRoutes);
router.use("/pets", petsRoutes);

module.exports = router;
