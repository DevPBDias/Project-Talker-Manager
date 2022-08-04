const randomToken = require('random-token');

const userValidateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;

    if (!email) {
        return res.status(400).json({
            message: 'O campo "email" é obrigatório',
          });
    }
    if (!regex.test(email)) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
          });
    }
    next();
};

const userValidatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({
            message: 'O campo "password" é obrigatório',
          });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
          });
    }
    next();
};

const randomTokenGenerator = (req, res, next) => {
    const rdToken = randomToken(16);

    if (rdToken) {
        return res.status(200).json({ token: `${rdToken}` });
    }
    next();
};

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Token não encontrado',
          });
    }
    if (authorization.length < 16) {
        return res.status(401).json({
            message: 'Token inválido',
          });
    }
    next();
};

module.exports = {
    randomTokenGenerator,
    userValidateEmail,
    userValidatePassword,
    validateToken,
};