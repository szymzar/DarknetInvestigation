const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/level1', levelController.getLevel1);
router.get('/level2', levelController.getLevel2);
router.get('/api/secret_data', levelController.getSecretData);
router.get('/level3', levelController.getLevel3);
router.get('/level4', levelController.getLevel4);
router.get('/level5_crypto_challenge', levelController.getLevel5CryptoChallenge);
router.post('/level5_crypto_challenge', levelController.postLevel5CryptoChallenge);

module.exports = router;
