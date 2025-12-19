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

app.get('/add', (req, res) => {
  const num1Raw = req.query.num1;
  const num2Raw = req.query.num2;
app.get('/add', addRouteLimiter, (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;

  // Normalize query parameters to single strings (handle string | string[] | undefined)
  const num1Str = Array.isArray(num1Raw) ? num1Raw[0] : num1Raw;
  const num2Str = Array.isArray(num2Raw) ? num2Raw[0] : num2Raw;

  // Validate that the inputs are present and non-empty strings
  if (
    typeof num1Str !== 'string' ||
    typeof num2Str !== 'string' ||
    num1Str.trim() === '' ||
    num2Str.trim() === ''
  ) {
    return res.status(400).json({ error: 'Invalid numeric parameters' });
  }

  // Parse as floating-point numbers and validate
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);
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