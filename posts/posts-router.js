const router = require("express").Router();
const db = require("../data/db");

// Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
  db.find()
    .then((data) => {
      res.status(200).json({ posts: data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  res.status(200).json({ router: "posts", url: "/api/posts", method: "POST" });
});

// 	Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  res.status(200).json({
    router: "posts",
    url: "/api/posts/:id",
    method: "GET",
    id: req.params.id,
  });
});

// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/:id", (req, res) => {
  res.status(200).json({
    router: "posts",
    url: "/api/posts/:id",
    method: "PUT",
    id: req.params.id,
  });
});

// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req, res) => {
  res.status(200).json({
    router: "posts",
    url: "/api/posts/:id",
    method: "DELETE",
    id: req.params.id,
  });
});

// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
  res.status(200).json({
    router: "posts",
    url: "/api/posts/:id/comments",
    method: "GET",
    id: req.params.id,
  });
});

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
  res.status(200).json({
    router: "posts",
    url: "/api/posts/:id/comments",
    method: "POST",
    id: req.params.id,
  });
});

module.exports = router;
