const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userControllerVersion2 = require('../controllers/userControllerVersion2');

router.get('/v2', userControllerVersion2.getAllUsers);
router.get('/v2/:id', userControllerVersion2.getUserById);
router.post('/v2', userControllerVersion2.createUser);
router.put('/v2/:id', userControllerVersion2.updateUser);
router.delete('/v2/:id', userControllerVersion2.deleteUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;