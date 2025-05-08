const express = require('express');
const { createAddress, getAddress } = require('../controllers/addressController');

const router = express.Router();

router.post('/', createAddress);
router.get('/:id', getAddress);

module.exports = router;