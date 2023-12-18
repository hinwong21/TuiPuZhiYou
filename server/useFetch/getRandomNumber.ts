export function getRandomSixDigitNumber() {
  const dateNow = new Date();
  const timestamp = dateNow.getTime().toString();
  const randomSixDigits = timestamp.substr(timestamp.length - 6).toString();
  return randomSixDigits;
}
