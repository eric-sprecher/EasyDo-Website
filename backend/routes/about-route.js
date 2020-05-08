const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(path.join(__dirname, '../../frontend')));

router.get('/', (require, response) => {
    response.sendFile(path.join(__dirname, '../../frontend', 'html', 'about.html'));
});

module.exports = router;