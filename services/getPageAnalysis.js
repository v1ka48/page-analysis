const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.get('/run-script', (req, res) => {
  const url = req.query.url;
  exec(`python3 ../scripts/scrapeTextScreenshot.py "${url}"`, (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to run script' });
    }
      return res.status(200).json({ response: stdout });
  });
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});