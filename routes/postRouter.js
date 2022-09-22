const { deletePost, updatePost, createPost, getOne, getAllPosts} = require("../controllers/postController");

const router = require("express").Router();

router.get("/",getAllPosts);
router.get("/:id",getOne);
router.post("/", createPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id",deletePost);

module.exports = router;