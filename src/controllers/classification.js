const classifications = [
  { name: "G", id: 1 },
  { name: "PG", id: 2 },
  { name: "PG-13", id: 3 },
  { name: "NC-17", id: 4 },
  { name: "R", id: 5 },
];

const getClassifications = () => {
  return ["G", "PG", "PG-13", "R", "NC-17"];
};

module.exports = {
  getClassifications,
};
