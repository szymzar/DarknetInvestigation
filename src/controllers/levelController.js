const { decryptChallenge } = require('../utils/cryptoUtils');

const getLevel1 = (req, res) => {
    res.render('levels/level1', {
        title: 'Darknet Investigation - Level 1',
        message: 'Welcome to Level 1. Inspect this page carefully for clues.',
        nextLevelPath: '/level2'
    });
};

const getLevel2 = (req, res) => {
    const { param } = req.query;
    if (param === 'alpha123') {
        res.render('levels/level2', {
            title: 'Darknet Investigation - Level 2',
            message: 'You found the correct parameter! Now, look for a hidden API endpoint. Hint: /api/secret_data',
            nextLevelPath: '/level3'
        });
    } else {
        res.status(403).render('error', {
            title: 'Access Denied',
            message: 'Incorrect parameter for Level 2. Go back and find the clue.'
        });
    }
};

const getSecretData = (req, res) => {
    res.set('X-Next-Level-Clue', 'Shift-3-Cipher-Required');
    res.json({
        status: 'success',
        message: 'Hidden data found! The next level awaits a custom HTTP header. The key for the simple cipher is "caesar".',
        encrypted_path: 'phvvdjh'
    });
};

const getLevel3 = (req, res) => {
    const secretHeader = req.get('X-Secret-Code');

    if (secretHeader && secretHeader.toLowerCase() === 'message') {
        res.cookie('next_step_token', 'initial_value', { maxAge: 900000, httpOnly: true });
        res.render('levels/level3', {
            title: 'Darknet Investigation - Level 3',
            message: 'You successfully provided the secret code! A cookie named "next_step_token" has been set. You need to change its value to "unlocked" to proceed to Level 4.',
            nextLevelPath: '/level4'
        });
    } else {
        res.status(403).render('error', {
            title: 'Access Denied',
            message: 'Missing or incorrect X-Secret-Code header. You need to provide the decrypted message.'
        });
    }
};

const getLevel4 = (req, res) => {
    const nextStepToken = req.cookies.next_step_token;

    if (nextStepToken === 'unlocked') {
        const localStorageClue = { hint: 'Look for a cryptographic puzzle in LocalStorage/SessionStorage.', path: '/level5_crypto_challenge', encrypted: Buffer.from('final_password_here').toString('base64').split('').reverse().join(''), method: 'reverse_base64' };
        res.render('levels/level4', {
            title: 'Darknet Investigation - Level 4',
            message: 'Cookie unlocked! You have access to Level 4. A new clue has been saved in your browser\'s LocalStorage.',
            localStorageClue: JSON.stringify(localStorageClue),
            nextLevelPath: '/level5_crypto_challenge'
        });
    } else {
        if (!nextStepToken) {
            res.cookie('next_step_token', 'initial_value', { maxAge: 900000, httpOnly: true });
        }
        res.status(403).render('error', {
            title: 'Access Denied',
            message: 'To access Level 4, you need to modify the "next_step_token" cookie to "unlocked". The cookie has been set for you (initial_value).'
        });
    }
};

const getLevel5CryptoChallenge = (req, res) => {
    res.render('levels/level5_crypto_challenge', {
        title: 'Darknet Investigation - Level 5: Crypto Challenge',
        message: 'Enter the decrypted password you found in LocalStorage.'
    });
};

const postLevel5CryptoChallenge = (req, res) => {
    const { decryptedPassword } = req.body;
    const correctPassword = 'final_password_here';

    if (decryptedPassword === correctPassword) {
        res.render('final_message', {
            title: 'Congratulations!',
            message: 'You have successfully decrypted the message and completed the Darknet Investigation!'
        });
    } else {
        res.status(400).render('levels/level5_crypto_challenge', {
            title: 'Darknet Investigation - Level 5: Crypto Challenge',
            message: 'Incorrect password. Try again!'
        });
    }
};


module.exports = {
    getLevel1,
    getLevel2,
    getSecretData,
    getLevel3,
    getLevel4,
    getLevel5CryptoChallenge,
    postLevel5CryptoChallenge
};
