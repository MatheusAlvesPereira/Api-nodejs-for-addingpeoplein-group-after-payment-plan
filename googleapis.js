const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/admin.directory.group.member'],
  process.env.ADMIN_USER 
);

const directory = google.admin({ version: 'directory_v1', auth });

app.post('/adicionar-ao-grupo', async (req, res) => {
  const email = req.body.email;

  try {
    await directory.members.insert({
      groupKey: process.env.GOOGLE_GROUP_EMAIL, 
      requestBody: {
        email,
        role: 'MEMBER'
      }
    });

    res.send(`
      <h1 style="text-align:center;margin-top:100px">✅ E-mail adicionado ao grupo com sucesso!</h1>
      <a href="/" style="display:block;text-align:center;margin-top:20px">Voltar</a>
    `);
  } catch (error) {
    console.error('Erro ao adicionar ao grupo:', error);
    res.status(500).send(`<h1>Erro ao adicionar: ${error.message}</h1>`);
  }
});