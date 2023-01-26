const containLetters = /[a-zA-Z]/;
const onlyLetters = /^[a-zA-ZÀ-ÿ]+$/;
const containNumbers = /^\d+$/;
const onlyNumbers = /[\d]/;
const containSymbols = /[!@#$%^°¬/'=&*(¡)¿~,.?":´{}|<>+-]/;
const isHttps =
  /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
const onlyLettersOrNumbers = /^[a-zA-Z0-9\s]+$/;

const onlyLettersOrNumbersCheck = (input) => {
  return onlyLettersOrNumbers.test(input);
};

const containLettersCheck = (input) => {
  return containLetters.test(input);
};
const onlyLettersCheck = (input) => {
  return onlyLetters.test(input);
};
const containNumbersCheck = (input) => {
  return containNumbers.test(input);
};
const onlyNumbersCheck = (input) => {
  return onlyNumbers.test(input);
};
const containSymbolsCheck = (input) => {
  return containSymbols.test(input);
};
const httpsLinkCheck = (input) => {
  return isHttps.test(input);
};

const isArrayOfStrigs = (input) => {
  return (
    Array.isArray(input) &&
    input.every((element) => typeof element === "string")
  );
};

module.exports = {
  onlyLettersOrNumbersCheck,
  containLettersCheck,
  onlyLettersCheck,
  containNumbersCheck,
  onlyNumbersCheck,
  containSymbolsCheck,
  httpsLinkCheck,
  isArrayOfStrigs,
};

// const {
//   containLettersCheck,
//   onlyLettersCheck,
//   containNumbersCheck,
//   onlyNumbersCheck,
//   containSymbolsCheck,
//   httpsLinkCheck,
// } = require("../helpers/validateInput");
