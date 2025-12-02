const express = require('express');
const controller = require('../controllers/preliminary.controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id/approve', controller.approve);
router.put('/:id/reject', controller.reject);
router.delete('/:id', controller.remove);

module.exports = router;
