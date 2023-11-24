const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nomeDoSeuBancoDeDados', { useNewUrlParser: true, useUnifiedTopology: true });

const Postagem = mongoose.model('Postagem', {
  título: String,
  conteúdo: String,
});

const Usuario = mongoose.model('Usuario', {
  email: String,
  senha: String,
});

app.post('/posts', async (req, res) => {
  try {
    const { título, conteúdo } = req.body;
    const postagem = new Postagem({
      título,
      conteúdo,
    });
    await postagem.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuário = await Usuario.findOne({ email, senha });
    if (usuário) {
      req.session.user = usuário;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');S
  }
});

app.get('/', (req, res) => {
  res.send('Bem vindo!!!!');
});

app.get('/api/users', (req, res) => {
  res.send([
    {
      name: 'João da Silva',
      email: 'joao@silva.com',
    },
    {
      name: 'Maria da Silva',
      email: 'maria@silva.com',
    },
  ]);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});


