const fs = require('fs');
const { talkersAPI } = require('./getTalkers');

const addTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const talkers = await talkersAPI();
    
    const newTalker = { id: talkers.length + 1, name, age, talk: { watchedAt, rate } };
    talkers.push(newTalker);

    fs.writeFileSync('./talker.json', JSON.stringify(talkers));

   return res.status(201).json(newTalker);
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
          });
    }
    if (name.length < 3) {
       return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    
    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
          });
    }
    if (age < 18) {
       return res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
          });
    }    
    next();
};

const validateWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    if (!watchedAt) {
        return res.status(400).json({
            message: 'O campo "watchedAt" é obrigatório',
          });
    }
    if (!regex.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
          });
    }     
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (!rate && rate !== 0) {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
          });
    }
    if (rate > 5 || rate < 1) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
          });
    }     
    next();
};

module.exports = {
    addTalker,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
};
