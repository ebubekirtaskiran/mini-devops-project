const express = require('express');
const app = express();
const path = require('path'); 
const PORT = process.env.PORT || 3000;

// Middleware - JSON formatında veri almak için
app.use(express.json());

// Static dosyaları (frontend) dışarı sunma
app.use(express.static('src/public'));

// In-Memory Veri Deposu (Geçici olarak bellek üzerinde tutuyoruz)
let tickets = [
  {
    id: 1,
    title: 'Sistem Giriş Hatası',
    description: 'Kullanıcılar giriş yaparken 500 hatası alıyor.',
    priority: 'High',
    status: 'Open',
    createdAt: new Date().toISOString()
  }
];

// Health Check Endpoint (Monitoring için)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Müşteri Destek API Çalışıyor' });
});

// Task #4: F1 - Yeni Destek Talebi Oluşturma (POST)
app.post('/api/tickets', (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Başlık ve açıklama zorunludur.' });
  }

  const newTicket = {
    id: tickets.length + 1,
    title,
    description,
    priority: priority || 'Medium',
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

// Task #5: F2 - Talepleri Listeleme ve Öncelik/Durum Filtreleme (GET)
app.get('/api/tickets', (req, res) => {
  const { priority, status } = req.query;
  let result = tickets;

  if (priority) {
    result = result.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (status) {
    result = result.filter(t => t.status.toLowerCase() === status.toLowerCase());
  }

  res.status(200).json(result);
});

// Task #6: F3 - Talep Durumunu Güncelleme (PUT)
app.put('/api/tickets/:id', (req, res) => {
  const ticketId = parseInt(req.params.id);
  const { status, priority } = req.body;

  const ticket = tickets.find(t => t.id === ticketId);

  if (!ticket) {
    return res.status(404).json({ error: 'Talep bulunamadı.' });
  }

  if (status) ticket.status = status;
  if (priority) ticket.priority = priority;

  res.status(200).json(ticket);
});

// Sunucuyu Başlatma
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Müşteri Destek API http://localhost:${PORT} üzerinde çalışıyor.`);
  });
}

module.exports = app;