const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, idTalkers } = require('./middlewares/readTalkers');
const {
  userValidateEmail,
  userValidatePassword,
  randomTokenValidate,
} = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', readTalkers);

app.get('/talker/:id', idTalkers);

app.post('/login', userValidateEmail, userValidatePassword, randomTokenValidate);

app.listen(PORT, () => {
  console.log('Online');
});
