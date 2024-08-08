const express = require('express')
const router = express.Router()
const {
  createProgress,
  getProgresses,
  getProgress,
  deleteProgress,
  updateProgress
} = require('../controllers/progressController')
const requireAuth = require('../middleware/requireAuth')

// reqire Auth
router.use(requireAuth)

router.get('/', getProgresses)

//Get a single progress
router.get('/:id',getProgress)

//post a new progress
router.post('/', createProgress)

//Delete a progress
router.delete('/:id',deleteProgress)

//update a progress
router.patch('/:id',updateProgress)


module.exports = router