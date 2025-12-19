import express from 'express';
import { setRoutes } from './routes/index';
import { logger } from './logger';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


setRoutes(app);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo'
});

connection.connect();

app.get('/add', (req, res) => {
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