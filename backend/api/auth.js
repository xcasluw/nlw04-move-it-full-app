const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

module.exports = (app) => {

  // Rota OK
  const signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("Informe usuário e senha!");
      }

      const user = await app
        .database("users")
        .where({ email: req.body.email })
        .first();

      if (!user) {
        return res.status(400).send("Usuário não encontrado!");
      }

      if (!user.active) {
        return res.status(400).send("Seu cadastro está aguardando aprovação do administrador!");
      }

      const isMatch = await bcrypt.compare(
        String(req.body.password),
        String(user.password)
      );

      if (!isMatch) {
        return res.status(401).send("Email ou senha inválidos!");
      }

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        level: user.level,
        currentExperience: user.current_experience,
        challengesCompleted: user.challenges_completed,
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      };

      await app
        .database("users")
        .update({ last_login: new Date() })
        .where({ id: user.id })
        .then((_) => {
          res.json({
            user: {
              ...payload,
            },
            token: jwt.encode(payload, authSecret),
          });
        })
        .catch((err) => {
          const jsonErr = JSON.stringify(err);
          const jsonUser = JSON.stringify(user);
          const errException = {
            description: `${jsonErr} - ${jsonUser}`
          };
          app
            .database("exceptions")
            .insert(errException)
            .then((_) => res.status(400).send({ msg: "Erro de servidor. Houve um erro ao fazer login" }))
            .catch((err) => res.status(500).json({ msg: "Erro de servidor. Houve um erro ao fazer login" }));
          return;
        });
    } catch (msg) {
      const errException = {
        description: JSON.stringify(msg)
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
      return res.status(500).send(msg);
    }
  };

  // Rota OK
  const validateToken = async (req, res) => {

    const arrToken = req.headers.authorization;

    if (arrToken) {
      const token = arrToken.split(" ");

      try {
        const decodeToken = jwt.decode(token[1], authSecret);

        if (decodeToken) {
          if (new Date(decodeToken.exp * 1000) > new Date()) {
            return res.send(true);
          }
        }
      } catch (e) {
        // Problema com o token
      }
    }

    return res.send(false);
  };

  return { signin, validateToken };
};
