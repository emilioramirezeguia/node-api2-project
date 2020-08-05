const router = require("express").Router();
const db = require("../data/db");

// GET all blog posts.
router.get("/", (req, res) => {
  db.find()
    .then((response) => {
      res.status(200).json({ posts: response });
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
    .then((response) => {
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
    .then((response) => {
      if (response.length) {
        res.status(200).json(response);
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
    .then((response) => {
      if (!response) {
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

// DELETE an existing blog post and return it.
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then((response) => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The post with the specified ID doest not exist." });
      } else {
        const deletedUser = response;
        db.remove(id)
          .then((response) => {
            res.status(200).json(deletedUser);
          })
          .catch({ error: "The post could not be removed" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

// GET comments for existing blog post.
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then((response) => {
      if (!response.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(response);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST comment to existing blog post.
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = req.body;

  db.findById(id)
    .then((response) => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        if (!comment.text) {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        } else {
          const newComment = {
            ...comment,
            post_id: id,
          };
          db.insertComment(newComment)
            .then((response) => {
              const commentID = response.id;
              db.findCommentById(commentID).then((response) => {
                res.status(200).json(response);
              });
            })
            .catch((error) => {
              res
                .status(404)
                .json({
                  message: "The comment with the specified ID does not exist.",
                });
            });
        }
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the comment to the database",
        });
    });
});

module.exports = router;
