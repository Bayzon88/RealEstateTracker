const express = require('express');
const router = express.Router();

router.get('/example', (req, res) => {
    res.json({ message: 'This is an example response from the controller!' });
});

module.exports = router; // Ensure the router is exported

