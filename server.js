import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors()); // Most permissive CORS
app.use(express.json()); // Built-in alternative to body-parser

// Helper to read DB
const readDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data || '[]');
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// GET all news
app.get('/api/news', (req, res) => {
  try {
    const news = readDB();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read news' });
  }
});

// POST update all news (sync)
app.post('/api/news', (req, res) => {
  try {
    const newsData = req.body;
    writeDB(newsData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save news' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is definitely running at http://localhost:${PORT}`);
});
