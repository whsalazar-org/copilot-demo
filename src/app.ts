import express from 'express';
import { setRoutes } from './routes/index';
import { logger } from './logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setRoutes(app);

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});