import express from 'express';
import cors from 'cors';
import realEstateController from './controllers/realEstateController.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Express App!');
});

app.use('/api', realEstateController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
