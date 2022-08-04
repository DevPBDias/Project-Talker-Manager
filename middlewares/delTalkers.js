const fs = require('fs');
const { talkersAPI } = require('./getTalkers');

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkers = await talkersAPI();

    const idTalker = talkers.find((talker) => talker.id === +id);
    const deleted = talkers.splice(idTalker, 1);

    fs.writeFileSync('./talker.json', JSON.stringify(deleted));

    return res.status(204).json(deleted);
};

module.exports = {
    deleteTalker,
};