const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from the Node.js CI/CD pipeline!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Only start listening when run directly (so tests can import the app)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;
