import express from 'express';
import router from './routes/users.route.js';

const app = express();

app.use(express.json());
app.use('/auth', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Listening on Port: ${PORT}`));
