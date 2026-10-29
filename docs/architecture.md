# Müþteri Destek Talep Sistemi - Mimari Doküman

## 1. Genel Mimarisi
Uygulama, Node.js ve Express.js framework'ü kullanýlarak geliþtirilmiþ bir RESTful API servisidir. Veriler bellek üzerinde (In-Memory) tutulmakta olup sonraki aþamalarda SQLite veritabaný entegrasyonu hedeflenmektedir.

## 2. Veri Modeli (Ticket Schema)
* **id:** `string / integer` - Benzersiz talep kimliði
* **title:** `string` - Destek talebi baþlýðý
* **description:** `string` - Talebin detaylý açýklamasý
* **priority:** `string` - Öncelik düzeyi (Low, Medium, High)
* **status:** `string` - Talep durumu (Open, In Progress, Closed)
* **createdAt:** `timestamp` - Oluþturulma tarihi
