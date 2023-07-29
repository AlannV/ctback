const server = require("./src/app.js");
const { fillClassificationDb } = require("./src/controllers/classification.js");
const { fillDisplayDb } = require("./src/controllers/display.js");
const { fillGenreDb } = require("./src/controllers/genre.js");
const { fillLanguageDb } = require("./src/controllers/language.js");
const { fillMoviesDb } = require("./src/controllers/movie.js");
const { fillSeatsDb } = require("./src/controllers/seats.js");
const { conn } = require("./src/db.js");

// conn.sync({ force: false }).then(() => {
conn.sync({ force: false }).then(() => {
  // fillDisplayDb();
  // fillGenreDb();
  // fillLanguageDb();
  // fillClassificationDb();
  // fillSeatsDb();
  // fillMoviesDb();
  server.listen(process.env.PORT || 3001, () => {
    console.log("listening at port " + process.env.PORT); // eslint-disable-line no-console
  });
});
