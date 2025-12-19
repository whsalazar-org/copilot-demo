import express from 'express';
import { setRoutes } from './routes/index';
import { logger } from './logger';
import mysql from 'mysql';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3000;

const addRouteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for this route
});

app.use(express.json());
app.use(addRouteLimiter);
setRoutes(app);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo'
});

connection.connect();

app.get('/add', addRouteLimiter, (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;

  // 🚩 Vulnerable: SQL Injection Example
  const query = `SELECT ${num1} + ${num2} AS result`;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ result: result[0].result });
    }
  });
});



app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});