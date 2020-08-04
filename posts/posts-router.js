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

// Create (POST) a new blog post.
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

// 	GET a blog post by id.
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
});

// Update (PUT) an existing blog post and return it
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  db.update(id, post)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!post.title || !post.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        db.findById(id)
          .then((updatedPost) => {
            res.status(200).json(updatedPost);
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: "The post information could not be retrieved." });
          });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
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
