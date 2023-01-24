const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadData = require("./src/helpers/loadData.js");
conn.sync({ alter: true }).then(() => {
  // loadData(); //Ejecuta para agregar los roles a la DB

  server.listen(process.env.PORT || 3001, () => {
    console.log("listening at port " + process.env.PORT); // eslint-disable-line no-console
  });
});
