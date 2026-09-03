import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Parse JSON bodies for photo uploads
app.use(express.json({ limit: '25mb' }));

// API to upload and save profile photo directly to server disk
app.post('/api/upload-photo', (req, res) => {
  try {
    const { dataUrl } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ error: 'No image data provided' });
    }
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(__dirname, 'profile.png'), buffer);
    return res.json({ success: true, url: '/profile.png?v=' + Date.now() });
  } catch (err) {
    console.error('Error saving uploaded photo:', err);
    return res.status(500).json({ error: 'Failed to save photo' });
  }
});

// API to check if profile.png exists
app.get('/api/photo-status', (req, res) => {
  const filePath = path.join(__dirname, 'profile.png');
  const exists = fs.existsSync(filePath);
  res.json({ exists, url: exists ? '/profile.png' : null });
});

// Profile image handler: serves uploaded profile.png if exists, else default-avatar.svg
app.get('/profile.png', (req, res) => {
  const customProfile = path.join(__dirname, 'profile.png');
  if (fs.existsSync(customProfile)) {
    return res.sendFile(customProfile);
  }
  return res.sendFile(path.join(__dirname, 'default-avatar.svg'));
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Fallback to index.html for root or SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
