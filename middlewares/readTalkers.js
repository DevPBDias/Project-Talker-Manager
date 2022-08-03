const fs = require('fs/promises');

const readTalkers = async (req, res) => {
    const content = await fs.readFile('./talker.json', 'utf-8');
    const palestrantes = JSON.parse(content);
    if (content.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(palestrantes);
  };

module.exports = {
    readTalkers,
};
