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
  const num1Raw = req.query.num1;
  const num2Raw = req.query.num2;

  // Validate that the inputs are numeric
  const num1 = Number(num1Raw);
  const num2 = Number(num2Raw);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numeric parameters' });
  }

  // Use a parameterized query to prevent SQL injection
  const query = 'SELECT ? + ? AS result';

  connection.query(query, [num1, num2], (err, result) => {
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