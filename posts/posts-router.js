const router = require("express").Router();
const db = require("../data/db");

// GET all blog posts.
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

// POST a new blog post.
router.post("/", (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).res.json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  db.insert(post)
    .then((data) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

// 	Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then((data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });

  //   res.status(200).json({
  //     router: "posts",
  //     url: "/api/posts/:id",
  //     method: "GET",
  //     id: req.params.id,
  //   });
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
