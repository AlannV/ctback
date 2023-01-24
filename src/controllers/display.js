const displays = [
  { name: "2D", id: 1 },
  { name: "3D", id: 2 },
  { name: "4DX", id: 3 },
  { name: "IMAX", id: 4 },
];

const getDisplay = () => {
  return ["2D", "3D", "4DX", "IMAX"];
};
module.exports = {
  getDisplay,
};
