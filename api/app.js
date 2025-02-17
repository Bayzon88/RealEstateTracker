const express = require('express');
const realEstateController = require('./controllers/realEstateController');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Express App!');
});

app.use('/api', realEstateController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
