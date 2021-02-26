const app = require("express")();
const expressS = require("express");
const consign = require("consign");
const database = require("./config/database");

app.database = database;
app.use(expressS.json());

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./utils")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

const port = 3001;

app.listen(port, () => {
  console.log(`Backend executando na porta ${port} http://localhost:${port}/`);
});
