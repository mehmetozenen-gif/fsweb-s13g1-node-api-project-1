// SUNUCUYU BU DOSYAYA KURUN
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// [POST] /api/users
server.post('/api/users', async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: 'Lütfen kullanıcı için bir name ve bio sağlayın' });
  }
  try {
    const newUser = await User.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Veritabanına kaydedilirken bir hata oluştu' });
  }
});

// [GET] /api/users
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcı bilgileri alınamadı' });
  }
});

// [GET] /api/users/:id
server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcı bilgisi alınamadı' });
  }
});

// [DELETE] /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: 'Belirtilen ID li kullanıcı bulunamadı' });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcı silinemedi' });
  }
});

// [PUT] /api/users/:id
server.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
    const { name, bio } = req.body;
    if (!name || !bio) {
      return res
        .status(400)
        .json({ message: 'Lütfen kullanıcı için name ve bio sağlayın' });
    }
    const updatedUser = await User.update(req.params.id, { name, bio });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Kullanıcı bilgileri güncellenemedi' });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
