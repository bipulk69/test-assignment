const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/posts', (req, res) => {
  res.status(200).json([
    {
      userId: 1,
      id: 1,
      title: "Sample title",
      body: "Sample body content"
    }
  ]);
});

app.get('/api/unauthorized', (req, res) => {
  res.status(401).json({
    error: "Unauthorized",
    message: "Invalid token"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
