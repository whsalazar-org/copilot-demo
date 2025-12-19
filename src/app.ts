import express from 'express';
import { setRoutes } from './routes/index';
import { logger } from './logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // 🚩 Vulnerable: SQL Injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(query, (err: Error, result: any) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (result.length > 0) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Placeholder db object for demonstration
const db = {
  query: (q: string, cb: (err: any, result: any) => void) => {
    // Simulate result for the demo
    cb(null, []);
  }
};


setRoutes(app);

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});