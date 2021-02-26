const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { urlFront } = require("../config/config");
const { mailHost, mailPort, mailAuth, mailFrom } = require("../config/email");

const secret = "nlw4-moveitapp";
const rounds = 9921;
const keySize = 32;
const algorithm = "aes-256-cbc";
const salt = crypto.createHash("sha1").update(secret).digest("hex");

module.exports = (app) => {
  const { existsOrError } = app.utils.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const encryptData = (data) => {
    try {
      let iv = crypto.randomBytes(16);
      let key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, "sha512");
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encryptedData = Buffer.concat([
        cipher.update(JSON.stringify(data)),
        cipher.final(),
      ]);
      return iv.toString("base64") + ":" + encryptedData.toString("base64");
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const decryptData = (encData) => {
    try {
      let textParts = encData.split(":");
      let iv = Buffer.from(textParts.shift(), "base64");
      let encryptedData = Buffer.from(textParts.join(":"), "base64");
      let key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, "sha512");
      let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decryptedData = decipher.update(encryptedData);
      decryptedData = Buffer.concat([decryptedData, decipher.final()]);
      return JSON.parse(decryptedData.toString());
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const save = async (req, res) => {
    const user = { ...req.body };

    try {
      existsOrError(user.email, "Email não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    const userExists = await app
      .database("users")
      .where({ email: user.email })
      .first();

    try {
      existsOrError(userExists, "Usuário não encontrado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.reset_password = Math.random().toString(36).substr(3, 10);
    const encryptedResetPassword = encryptData(user.reset_password);

    const response = await app
      .database("users")
      .update(user)
      .where({ email: user.email })
      .whereNull("deleted_at");

    if (response === 1) {
      const transport = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        auth: {
          user: mailAuth.user,
          pass: mailAuth.pass,
        },
      });

      const emailHtml = `
        Prezado ${userExists.name},<br><br>
        Você solicitou uma alteração de senha.<br>
        Para continuar com a solicitação, clique no link abaixo ou cole o endereço no seu navegador.<br><br>
        ${urlFront}/reset-password?token=${encryptedResetPassword}<br><br>
        Usuário: ${userExists.email}<br><br>
        Caso você não tenha solicitado essa alteração, nenhuma ação é necessária.\n
        Sua senha permanecerá a mesma até que você ative este código.<br><br><br>
        Equipe Move It
      `;

      const emailText = `
        Prezado ${userExists.name},\n\n
        Você solicitou uma alteração de senha.\n
        Para continuar com a solicitação, clique no link abaixo ou cole o endereço no seu navegador.\n\n
        ${urlFront}/reset-password?token=${encryptedResetPassword.iv}-${encryptedResetPassword.encryptedData}\n\n
        Usuário: ${userExists.email}\n\n
        Caso você não tenha solicitado essa alteração, nenhuma ação é necessária.\n
        Sua senha permanecerá a mesma até que você ative este código.\n\n\n
        Equipe Move It
      `;

      const infoMail = {
        from: mailFrom,
        to: user.email,
        subject: "Instruções para recuperação de senha - Move It",
        html: emailHtml,
        text: emailText,
      };

      transport.sendMail(infoMail, (error) => {
        if (error) {
          return res
            .status(400)
            .json({ error: "Houve um erro ao recuperar senha" });
        } else {
          return res.status(201).json({
            msg:
              "Um e-mail com instruções para recuperação de senha foi enviado. Cheque sua caixa de entrada.",
          });
        }
      });
    } else {
      return res
        .status(400)
        .json({ error: "Houve um erro ao recuperar senha" });
    }
  };

  const update = async (req, res) => {
    const userData = { ...req.body };

    if (!userData.reset_password) {
      return res
        .status(400)
        .json({ error: "Chave inválida. Contate o suporte." });
    }

    const decryptedKey = decryptData(userData.reset_password);

    const keyExists = await app
      .database("users")
      .where({ reset_password: decryptedKey })
      .whereNull("deleted_at")
      .first();

    try {
      existsOrError(keyExists, "URL inválida");
      existsOrError(userData.password, "Senha não informada");
      existsOrError(
        userData.confirm_password,
        "A confirmação de senha não foi informada"
      );
      if (String(userData.password) != String(userData.confirm_password)) {
        return res.status(400).json({ error: "Senhas não conferem" });
      }
    } catch (msg) {
      return res.status(400).json(msg);
    }

    userData.password = encryptPassword(String(req.body.password));
    userData.reset_password = null;
    delete userData.confirm_password;

    const response = await app
      .database("users")
      .update(userData)
      .where({ id: keyExists.id })
      .whereNull("deleted_at");

    if (response === 1) {
      return res.status(201).json({
        msg: "A senha foi alterada. Você já pode realizar login no sistema.",
      });
    } else {
      return res
        .status(400)
        .json({ error: "Houve um erro ao alterar a senha. Tente novamente." });
    }
  };

  return { save, update };
};
