const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtID').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post().delete();

module.exports = router;
