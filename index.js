const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, idTalkers } = require('./middlewares/getTalkers');
const {
  userValidateEmail,
  userValidatePassword,
  randomTokenGenerator,
  validateToken,
} = require('./middlewares/login');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  addTalker,
} = require('./middlewares/postTalkers');
const { editTalker } = require('./middlewares/putTalkers');
const { deleteTalker } = require('./middlewares/delTalkers');

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

app.post('/login', userValidateEmail, userValidatePassword, randomTokenGenerator);

app.post('/talker', validateToken,
  validateName, validateAge, validateTalk, validateWatchedAt, validateRate, addTalker);

app.put('/talker/:id', validateToken,
validateName, validateAge, validateTalk, validateWatchedAt, validateRate, editTalker);

app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
