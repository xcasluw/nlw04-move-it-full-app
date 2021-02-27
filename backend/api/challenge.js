module.exports = (app) => {

  // Rota OK
  const get = async (req, res) => {

    const challenges = await app
      .database("challenges")
      .select("*");

    return res.json(challenges);
  };

  // Rota OK
  const getById = async (req, res) => {

    const challengeId = req.params.id;

    if (!challengeId) {
      return res.status(400).json({ msg: "Desafio não informado" });
    }

    const challenge = await app
      .database("challenges")
      .where({ id: challengeId })
      .select("*")
      .first();

    return res.json(challenge);
  };

  return { get, getById };
};