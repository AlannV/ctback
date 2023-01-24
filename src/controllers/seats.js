const seats = [
  { name: "A01", id: 1, available: true },
  { name: "A02", id: 2, available: true },
  { name: "A03", id: 3, available: true },
  { name: "A04", id: 4, available: true },
  { name: "A05", id: 5, available: true },
  { name: "A06", id: 6, available: true },
  { name: "A07", id: 7, available: true },
  { name: "A08", id: 8, available: true },
  { name: "A09", id: 9, available: true },
  { name: "A10", id: 10, available: true },
  { name: "A11", id: 11, available: true },
  { name: "A12", id: 12, available: true },
  { name: "A13", id: 13, available: true },
  { name: "A14", id: 14, available: true },
  { name: "A15", id: 15, available: true },
  { name: "A16", id: 16, available: true },
  { name: "A17", id: 17, available: true },
  { name: "A18", id: 18, available: true },
  { name: "A19", id: 19, available: true },
  { name: "A20", id: 20, available: true },
  { name: "B01", id: 21, available: true },
  { name: "B02", id: 22, available: true },
  { name: "B03", id: 23, available: true },
  { name: "B04", id: 24, available: true },
  { name: "B05", id: 25, available: true },
  { name: "B06", id: 26, available: true },
  { name: "B07", id: 27, available: true },
  { name: "B08", id: 28, available: true },
  { name: "B09", id: 29, available: true },
  { name: "B10", id: 30, available: true },
  { name: "B11", id: 31, available: true },
  { name: "B12", id: 32, available: true },
  { name: "B13", id: 33, available: true },
  { name: "B14", id: 34, available: true },
  { name: "B15", id: 35, available: true },
  { name: "B16", id: 36, available: true },
  { name: "B17", id: 37, available: true },
  { name: "B18", id: 38, available: true },
  { name: "B19", id: 39, available: true },
  { name: "B20", id: 40, available: true },
  { name: "C01", id: 41, available: true },
  { name: "C02", id: 42, available: true },
  { name: "C03", id: 43, available: true },
  { name: "C04", id: 44, available: true },
  { name: "C05", id: 45, available: true },
  { name: "C06", id: 46, available: true },
  { name: "C07", id: 47, available: true },
  { name: "C08", id: 48, available: true },
  { name: "C09", id: 49, available: true },
  { name: "C10", id: 50, available: true },
  { name: "C11", id: 51, available: true },
  { name: "C12", id: 52, available: true },
  { name: "C13", id: 53, available: true },
  { name: "C14", id: 54, available: true },
  { name: "C15", id: 55, available: true },
  { name: "C16", id: 56, available: true },
  { name: "C17", id: 57, available: true },
  { name: "C18", id: 58, available: true },
  { name: "C19", id: 59, available: true },
  { name: "C20", id: 60, available: true },
  { name: "D01", id: 61, available: true },
  { name: "D02", id: 62, available: true },
  { name: "D03", id: 63, available: true },
  { name: "D04", id: 64, available: true },
  { name: "D05", id: 65, available: true },
  { name: "D06", id: 66, available: true },
  { name: "D07", id: 67, available: true },
  { name: "D08", id: 68, available: true },
  { name: "D09", id: 69, available: true },
  { name: "D10", id: 70, available: true },
  { name: "D11", id: 71, available: true },
  { name: "D12", id: 72, available: true },
  { name: "D13", id: 73, available: true },
  { name: "D14", id: 74, available: true },
  { name: "D15", id: 75, available: true },
  { name: "D16", id: 76, available: true },
  { name: "D17", id: 77, available: true },
  { name: "D18", id: 78, available: true },
  { name: "D19", id: 79, available: true },
  { name: "D20", id: 80, available: true },
  { name: "E01", id: 81, available: true },
  { name: "E02", id: 82, available: true },
  { name: "E03", id: 83, available: true },
  { name: "E04", id: 84, available: true },
  { name: "E05", id: 85, available: true },
  { name: "E06", id: 86, available: true },
  { name: "E07", id: 87, available: true },
  { name: "E08", id: 88, available: true },
  { name: "E09", id: 89, available: true },
  { name: "E10", id: 90, available: true },
  { name: "E11", id: 91, available: true },
  { name: "E12", id: 92, available: true },
  { name: "E13", id: 93, available: true },
  { name: "E14", id: 94, available: true },
  { name: "E15", id: 95, available: true },
  { name: "E16", id: 96, available: true },
  { name: "E17", id: 97, available: true },
  { name: "E18", id: 98, available: true },
  { name: "E19", id: 99, available: true },
  { name: "E20", id: 100, available: true },
  { name: "F01", id: 101, available: true },
  { name: "F02", id: 102, available: true },
  { name: "F03", id: 103, available: true },
  { name: "F04", id: 104, available: true },
  { name: "F05", id: 105, available: true },
  { name: "F06", id: 106, available: true },
  { name: "F07", id: 107, available: true },
  { name: "F08", id: 108, available: true },
  { name: "F09", id: 109, available: true },
  { name: "F10", id: 110, available: true },
  { name: "F11", id: 111, available: true },
  { name: "F12", id: 112, available: true },
  { name: "F13", id: 113, available: true },
  { name: "F14", id: 114, available: true },
  { name: "F15", id: 115, available: true },
  { name: "F16", id: 116, available: true },
  { name: "F17", id: 117, available: true },
  { name: "F18", id: 118, available: true },
  { name: "F19", id: 119, available: true },
  { name: "F20", id: 120, available: true },
  { name: "G01", id: 121, available: true },
  { name: "G02", id: 122, available: true },
  { name: "G03", id: 123, available: true },
  { name: "G04", id: 124, available: true },
  { name: "G05", id: 125, available: true },
  { name: "G06", id: 126, available: true },
  { name: "G07", id: 127, available: true },
  { name: "G08", id: 128, available: true },
  { name: "G09", id: 129, available: true },
  { name: "G10", id: 130, available: true },
  { name: "G11", id: 131, available: true },
  { name: "G12", id: 132, available: true },
  { name: "G13", id: 133, available: true },
  { name: "G14", id: 134, available: true },
  { name: "G15", id: 135, available: true },
  { name: "G16", id: 136, available: true },
  { name: "G17", id: 137, available: true },
  { name: "G18", id: 138, available: true },
  { name: "G19", id: 139, available: true },
  { name: "G20", id: 140, available: true },
  { name: "H01", id: 141, available: true },
  { name: "H02", id: 142, available: true },
  { name: "H03", id: 143, available: true },
  { name: "H04", id: 144, available: true },
  { name: "H05", id: 145, available: true },
  { name: "H06", id: 146, available: true },
  { name: "H07", id: 147, available: true },
  { name: "H08", id: 148, available: true },
  { name: "H09", id: 149, available: true },
  { name: "H10", id: 150, available: true },
  { name: "H11", id: 151, available: true },
  { name: "H12", id: 152, available: true },
  { name: "H13", id: 153, available: true },
  { name: "H14", id: 154, available: true },
  { name: "H15", id: 155, available: true },
  { name: "H16", id: 156, available: true },
  { name: "H17", id: 157, available: true },
  { name: "H18", id: 158, available: true },
  { name: "H19", id: 159, available: true },
  { name: "H20", id: 160, available: true },
  { name: "I01", id: 161, available: true },
  { name: "I02", id: 162, available: true },
  { name: "I03", id: 163, available: true },
  { name: "I04", id: 164, available: true },
  { name: "I05", id: 165, available: true },
  { name: "I06", id: 166, available: true },
  { name: "I07", id: 167, available: true },
  { name: "I08", id: 168, available: true },
  { name: "I09", id: 169, available: true },
  { name: "I10", id: 170, available: true },
  { name: "I11", id: 171, available: true },
  { name: "I12", id: 172, available: true },
  { name: "I13", id: 173, available: true },
  { name: "I14", id: 174, available: true },
  { name: "I15", id: 175, available: true },
  { name: "I16", id: 176, available: true },
  { name: "I17", id: 177, available: true },
  { name: "I18", id: 178, available: true },
  { name: "I19", id: 179, available: true },
  { name: "I20", id: 180, available: true },
  { name: "J01", id: 181, available: true },
  { name: "J02", id: 182, available: true },
  { name: "J03", id: 183, available: true },
  { name: "J04", id: 184, available: true },
  { name: "J05", id: 185, available: true },
  { name: "J06", id: 186, available: true },
  { name: "J07", id: 187, available: true },
  { name: "J08", id: 188, available: true },
  { name: "J09", id: 189, available: true },
  { name: "J10", id: 190, available: true },
  { name: "J11", id: 191, available: true },
  { name: "J12", id: 192, available: true },
  { name: "J13", id: 193, available: true },
  { name: "J14", id: 194, available: true },
  { name: "J15", id: 195, available: true },
  { name: "J16", id: 196, available: true },
  { name: "J17", id: 197, available: true },
  { name: "J18", id: 198, available: true },
  { name: "J19", id: 199, available: true },
  { name: "J20", id: 200, available: true },
];

const getSeats = () => {
  return [
    "A01",
    "A02",
    "A03",
    "A04",
    "A05",
    "A06",
    "A07",
    "A08",
    "A09",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
    "A18",
    "A19",
    "A20",
    "B01",
    "B02",
    "B03",
    "B04",
    "B05",
    "B06",
    "B07",
    "B08",
    "B09",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "B15",
    "B16",
    "B17",
    "B18",
    "B19",
    "B20",
    "C01",
    "C02",
    "C03",
    "C04",
    "C05",
    "C06",
    "C07",
    "C08",
    "C09",
    "C10",
    "C11",
    "C12",
    "C13",
    "C14",
    "C15",
    "C16",
    "C17",
    "C18",
    "C19",
    "C20",
    "D01",
    "D02",
    "D03",
    "D04",
    "D05",
    "D06",
    "D07",
    "D08",
    "D09",
    "D10",
    "D11",
    "D12",
    "D13",
    "D14",
    "D15",
    "D16",
    "D17",
    "D18",
    "D19",
    "D20",
    "E01",
    "E02",
    "E03",
    "E04",
    "E05",
    "E06",
    "E07",
    "E08",
    "E09",
    "E10",
    "E11",
    "E12",
    "E13",
    "E14",
    "E15",
    "E16",
    "E17",
    "E18",
    "E19",
    "E20",
    "F01",
    "F02",
    "F03",
    "F04",
    "F05",
    "F06",
    "F07",
    "F08",
    "F09",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "F17",
    "F18",
    "F19",
    "F20",
    "G01",
    "G02",
    "G03",
    "G04",
    "G05",
    "G06",
    "G07",
    "G08",
    "G09",
    "G10",
    "G11",
    "G12",
    "G13",
    "G14",
    "G15",
    "G16",
    "G17",
    "G18",
    "G19",
    "G20",
    "H01",
    "H02",
    "H03",
    "H04",
    "H05",
    "H06",
    "H07",
    "H08",
    "H09",
    "H10",
    "H11",
    "H12",
    "H13",
    "H14",
    "H15",
    "H16",
    "H17",
    "H18",
    "H19",
    "H20",
    "I01",
    "I02",
    "I03",
    "I04",
    "I05",
    "I06",
    "I07",
    "I08",
    "I09",
    "I10",
    "I11",
    "I12",
    "I13",
    "I14",
    "I15",
    "I16",
    "I17",
    "I18",
    "I19",
    "I20",
    "J01",
    "J02",
    "J03",
    "J04",
    "J05",
    "J06",
    "J07",
    "J08",
    "J09",
    "J10",
    "J11",
    "J12",
    "J13",
    "J14",
    "J15",
    "J16",
    "J17",
    "J18",
    "J19",
    "J20",
  ];
};
module.exports = {
  getSeats,
};
