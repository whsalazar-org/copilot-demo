app.post('/search', (req, res) => {
  const term = req.body.term;
  db.query(`SELECT * FROM products WHERE name LIKE '%${term}%'`);
  res.send('Búsqueda completada.');
});