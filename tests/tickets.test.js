const request = require('supertest');
const app = require('../src/app');

describe('Müşteri Destek Talep Sistemi API Testleri', () => {
  let createdTicketId;

  // Test 1: Health Check
  test('GET /health - Sunucu durumunu 200 OK dönmeli', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  // Test 2: Yeni Talep Oluşturma (POST)
  test('POST /api/tickets - Yeni destek talebi oluşturmalı', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        title: 'Otomatik Test Talebi',
        description: 'Jest ve Supertest ile oluşturulmuştur.',
        priority: 'High'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Otomatik Test Talebi');
    expect(res.body.status).toBe('Open');
    createdTicketId = res.body.id;
  });

  // Test 3: Talepleri Listeleme (GET)
  test('GET /api/tickets - Tüm talepleri dizi olarak listelemeli', async () => {
    const res = await request(app).get('/api/tickets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 4: Talep Durumu Güncelleme (PUT)
  test('PUT /api/tickets/:id - Talep durumunu güncellemeli', async () => {
    const res = await request(app)
      .put(`/api/tickets/${createdTicketId}`)
      .send({ status: 'Closed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Closed');
  });

  // Test 5: Talep Silme (DELETE)
  test('DELETE /api/tickets/:id - Oluşturulan talebi silmeli', async () => {
    const res = await request(app).delete(`/api/tickets/${createdTicketId}`);
    expect(res.statusCode).toBe(200);
  });
});