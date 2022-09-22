const { getOne, updateUser, deleteUser } = require("../controllers/userController");
const router = require("express").Router();

router.get("/:id",getOne);
router.put("/update/:id",updateUser); 
router.delete("/delete/:id",deleteUser);
module.exports = router;