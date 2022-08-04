const fs = require('fs');
const { talkersAPI } = require('./getTalkers');

const editTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const talkers = await talkersAPI();
};

module.exports = {
    editTalker,
};