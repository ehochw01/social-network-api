const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
            console.log("_id:", _id);
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      req.body, 
      { new: true, runValidators: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $push: { reactions: req.body } },
      { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, 
      { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

