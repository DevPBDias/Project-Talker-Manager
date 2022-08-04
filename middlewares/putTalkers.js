const fs = require('fs');
const { talkersAPI } = require('./getTalkers');

const editTalker = async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const talkers = await talkersAPI();
    let editedTalker = {};
  // criando uma variavel maleavel para inserir as novas info, menos o id pq ele nao muda, usando map para imprimir o talker
    const editedInfoTalker = talkers.map((talker) => {
      if (talker.id === +id) {
        editedTalker = {
          id: talker.id,
          ...newInfo,
        };
        return editedTalker;
      }
      return talker;
    });
    fs.writeFileSync('./talker.json', JSON.stringify(editedInfoTalker));
  
    return res.status(200).json(editedTalker);
};

module.exports = {
    editTalker,
};