const express = require('express');
const router = express.Router();
const dormController = require('../controllers/DormController');

router.post('/', dormController.createDorm).get('/', dormController.getAllDorms);
router.get('/:id', dormController.getDormById);
router.put('/:id', dormController.updateDormById);
router.delete('/:id', dormController.deleteDormById);

module.exports = router;
