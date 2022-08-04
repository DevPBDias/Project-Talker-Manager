const fs = require('fs/promises');

const talkersAPI = async () => {
    const content = await fs.readFile('./talker.json', 'utf-8');
    const palestrantes = JSON.parse(content);
    return palestrantes;
};

const readTalkers = async (req, res) => {
    const api = await talkersAPI();

    if (api.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(api);
  };

const idTalkers = async (req, res) => {
    const api = await talkersAPI();
    const { id } = req.params;
    const idPalestrantes = api.find((talker) => talker.id === +id);

    if (!idPalestrantes) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(idPalestrantes);
};

module.exports = {
    talkersAPI,
    readTalkers,
    idTalkers,
};
