const express = require('express');
const router = express.Router();
const dormController = require('../controllers/dorm.controller');

router.post('/', dormController.createDorm);
router.get('/:id', dormController.getDormById);
router.put('/:id', dormController.updateDormById);
router.delete('/:id', dormController.deleteDormById);

module.exports = router;
