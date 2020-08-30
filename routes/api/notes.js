const express = require("express");
const router = express.Router();
const Note = require("../../models/notes");
const auth = require("../middleware/auth");
//get api/notes
router.get("/", auth, (req, res) => {
  const name = req.user.id;

  const query = {
    owner: req.user.id,
  };
  Note.find(query)
    .sort({ date: -1 })
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

//post create api/notes
router.post("/", auth, (req, res) => {
  const newNote = new Note({
    owner: req.user.id,
    name: req.body.name,
    content: req.body.content,
  });

  newNote.save().then((note) => res.json(note));
});

//delete api/notes
router.delete("/:id", auth, (req, res) => {
  Note.findById(req.params.id)
    .then((note) => note.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
