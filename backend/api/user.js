const bcrypt = require("bcrypt");
const moment = require("moment");

moment.locale("pt-BR");

module.exports = (app) => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError,
  } = app.utils.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  // Rota Save OK (Tratar requisição com ID)
  const save = async (req, res) => {

    const user = { ...req.body };

    if (req.params.id) {
      user.id = req.params.id;
    }

    if (!req.originalUrl.startsWith("/users")) {
      user.admin = false;
    }

    if (!req.user || !req.user.admin) {
      user.admin = false;
    }

    if (!req.params.id) {
      user.image = "user.png";
    }

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "Email não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(
        user.confirmPassword,
        "A confirmação de senha não foi informada"
      );
      equalsOrError(
        user.password,
        user.confirmPassword,
        "Senhas não conferem"
      );

      const userFromDB = await app
        .database("users")
        .where({ email: user.email })
        .first();

      if (!user.id) {
        notExistsOrError(userFromDB, "Email já cadastrado");
      }
    } catch (errMsg) {

      delete user.password;
      delete user.confirmPassword;

      const jsonErr = JSON.stringify(errMsg);
      const jsonUser = JSON.stringify(user);
      const errException = {
        description: `${jsonErr} - ${jsonUser}`
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: errMsg }))
        .catch((err) => res.status(500).json({ msg: errMsg }));
      return;
    }

    user.password = encryptPassword(String(req.body.password));
    delete user.confirmPassword;

    if (user.id) {
      await app
        .database("users")
        .update(user)
        .where({ id: user.id })
        .whereNull("deleted_at")
        .then((_) => res.status(204).send())
        .catch((err) => {

          delete user.password;

          const jsonErr = JSON.stringify(err);
          const jsonUser = JSON.stringify(user);
          const errException = {
            description: `${jsonErr} - ${jsonUser}`
          };
          app
            .database("exceptions")
            .insert(errException)
            .then((_) => res.status(400).json({ msg: "Erro de servidor. Por favor, contate o administrador" }))
            .catch((err) => res.status(500).json({ msg: "Erro de servidor. Por favor, contate o administrador" }));
          return;
        });
    } else {
      app.database("users").insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => {

          delete user.password;

          const jsonErr = JSON.stringify(err);
          const jsonUser = JSON.stringify(user);
          const errException = {
            description: `${jsonErr} - ${jsonUser}`
          };
          app
            .database("exceptions")
            .insert(errException)
            .then((_) => res.status(400).json({ msg: "Erro de servidor. Por favor, contate o administrador" }))
            .catch((err) => res.status(500).json({ msg: "Erro de servidor. Por favor, contate o administrador" }));
          return;
        });
    }
  };

  // Rota OK
  const get = async (req, res) => {

    try {
      const users = await app
        .database("users")
        .select("id", "name", "image", "email", "admin", "active", "created_at", "deleted_at")
        .orderBy("created_at", "desc");

      const serializedUsers = users.map((user) => {

        return {
          id: user.id,
          name: user.name,
          image_url: `http://192.168.0.139:3001/uploads/users/${user.image}`,
          email: user.email,
          admin: user.admin,
          active: user.active,
          created_at: moment(user.created_at).format('DD/MM/YYYY HH:mm'),
          deleted_at: user.deleted_at != null ? moment(user.deleted_at).format('DD/MM/YYYY HH:mm') : null,
        };
      });

      return res.json(serializedUsers);

    } catch (error) {

      const jsonErr = JSON.stringify(error);
      const jsonUser = JSON.stringify("GET ALL USERS");
      const errException = {
        description: `${jsonErr} - ${jsonUser}`
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: "Erro de servidor. Erro ao tentar buscar todos usuários" }))
        .catch((err) => res.status(500).json({ msg: "Erro de servidor. Erro ao tentar buscar todos usuários" }));
      return;
    }
  };

  // Rota OK
  const getById = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ msg: "Usuário não informado" });
    }

    try {
      const user = await app
        .database("users")
        .select("id", "name", "image", "email", "admin", "active", "created_at", "deleted_at")
        .where({ id: userId })
        .whereNull("deleted_at")
        .first();

      if (user) {

        const serializedUser = {
          id: user.id,
          name: user.name,
          image_url: `http://192.168.0.139:3001/uploads/users/${user.image}`,
          email: user.email,
          admin: user.admin,
          active: user.active,
          created_at: moment(user.created_at).format('DD/MM/YYYY HH:mm'),
          deleted_at: user.deleted_at != null ? moment(user.deleted_at).format('DD/MM/YYYY HH:mm') : null,
        };

        return res.json(serializedUser);

      } else {
        const jsonUser = JSON.stringify(`Usuário com ID não existe: ${userId}`);
        const errException = {
          description: `${jsonUser}`
        };
        app
          .database("exceptions")
          .insert(errException)
          .then((_) => res.status(400).json({ msg: "Erro de servidor. O usuário informado não existe" }))
          .catch((err) => res.status(500).json({ msg: "Erro de servidor. O usuário informado não existe" }));
        return;
      }
    } catch (error) {

      const jsonErr = JSON.stringify(error);
      const jsonUser = JSON.stringify(`GET USER BY ID: ${userId}`);
      const errException = {
        description: `${jsonErr} - ${jsonUser}`
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: "Erro de servidor. Erro ao tentar buscar informações do usuário" }))
        .catch((err) => res.status(500).json({ msg: "Erro de servidor. Erro ao tentar buscar informações do usuário" }));
      return;
    }
  };

  // Rota OK
  const removeUser = async (req, res) => {

    if (Number(req.params.id) === Number(req.user.id)) {
      return res.status(401).json({ error: "Não é possível se desativar do sistema" });
    }

    try {

      existsOrError(req.params.id, "Id do usuário não informado");

      const userFromDB = await app
        .database("users")
        .where({ id: req.params.id })
        .first();

      if (!userFromDB) {
        return res.status(400).json({ msg: "O usuário informado não existe" });
      }
    } catch (errMsg) {

      const jsonErr = JSON.stringify(errMsg);
      const errException = {
        description: `${jsonErr} - ${req.params.id}`
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: errMsg }))
        .catch((err) => res.status(500).json({ msg: errMsg }));
      return;
    }

    const dateNow = new Date();
    const now = moment(dateNow).format('YYYY-MM-DD HH:mm:ss');

    await app
      .database("users")
      .update("active", 0)
      .update("deleted_at", now)
      .where({ id: req.params.id })
      .then((_) => res.status(204).send())
      .catch((err) => {

        const jsonErr = JSON.stringify(err);
        const jsonUser = JSON.stringify(req.params.id);
        const errException = {
          description: `${jsonErr} - ${jsonUser}`
        };
        app
          .database("exceptions")
          .insert(errException)
          .then((_) => res.status(400).json({ msg: "Erro de servidor. Por favor, contate o administrador" }))
          .catch((err) => res.status(500).json({ msg: "Erro de servidor. Por favor, contate o administrador" }));
        return;
      });

  };

  // Rota OK
  const changeInfos = async (req, res) => {

    const user = { ...req.user };
    const name = req.body.name;

    if (Object.keys(req.body.name).length === 0) {
      return res.status(400).json({ error: "Nenhum campo foi informado" });
    }

    try {
      const userFromDB = await app
        .database("users")
        .where({ email: user.email })
        .first();

      if (!userFromDB) {
        return res.status(400).json({ error: "O usuário informado não existe" });
      }
    } catch (errMsg) {

      const jsonErr = JSON.stringify(errMsg);
      const jsonUser = JSON.stringify(user);
      const errException = {
        description: `${jsonErr} - ${jsonUser}`
      };

      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: errMsg }))
        .catch((err) => res.status(500).json({ msg: errMsg }));
      return;
    }

    if (user.id) {
      await app
        .database("users")
        .update("name", name)
        .where({ id: Number(req.user.id) })
        .whereNull("deleted_at")
        .then((_) => res.status(204).send())
        .catch((err) => {

          const jsonErr = JSON.stringify(err);
          const jsonUser = JSON.stringify(user);
          const errException = {
            description: `${jsonErr} - ${jsonUser}`
          };
          app
            .database("exceptions")
            .insert(errException)
            .then((_) => res.status(400).json({ msg: "Erro de servidor. Por favor, contate o administrador" }))
            .catch((err) => res.status(500).json({ msg: "Erro de servidor. Por favor, contate o administrador" }));
          return;
        });
    }
  };

  // Rota OK
  const changeImage = async (req, res) => {

    const user = {};

    if (!req.file) {
      let msg = "Imagem não informada";
      return res.status(400).send(msg);
    }

    user.image = req.file.filename;

    try {
      existsOrError(user.image, "Imagem não informada");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    const userExists = await app
      .database("users")
      .where({ id: req.user.id })
      .first();

    if (userExists) {
      app
        .database("users")
        .update(user)
        .where({ id: req.user.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const increaseExp = async (req, res) => {

    const infos = req.body;

    try {

      const userExists = await app
        .database("users")
        .where({ id: req.user.id })
        .first();

      if (userExists) {
        app
          .database("users")
          .update(infos)
          .where({ id: req.user.id })
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).send(err));
      }


    } catch (error) {

      const jsonErr = JSON.stringify(error);
      const jsonUser = JSON.stringify("INCREASE XP");
      const errException = {
        description: `${jsonErr} - ${jsonUser}`
      };
      app
        .database("exceptions")
        .insert(errException)
        .then((_) => res.status(400).json({ msg: "Erro de servidor. Erro ao tentar atualizar informações de xp do usuário" }))
        .catch((err) => res.status(500).json({ msg: "Erro de servidor. Erro ao tentar atualizar informações de xp do usuário" }));
      return;
    }

  }

  const getExp = async (req, res) => {

    const infoExp = await app
      .database("users")
      .select("current_experience", "challenges_completed", "level")
      .where({ id: req.user.id })
      .first()

    return res.json(infoExp);

  }

  return { save, get, getById, removeUser, changeInfos, changeImage, increaseExp, getExp };
};
