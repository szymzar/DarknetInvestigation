const decryptChallenge = (encryptedText, method) => {
    if (method === 'reverse_base64') {
        try {
            const reversed = encryptedText.split('').reverse().join('');
            return Buffer.from(reversed, 'base64').toString('utf8');
        } catch (e) {
            return null;
        }
    }
    return null;
};

module.exports = {
    decryptChallenge
};
