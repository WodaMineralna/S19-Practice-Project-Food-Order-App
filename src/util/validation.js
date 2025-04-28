export function isEmpty(input) {
  return input.trim("").length === 0;
}

export function isEmailAdress(input) {
  return input.includes("@");
}

export function isLongEnough(input, howLong) {
  return input.trim("").length >= howLong;
}

export function isPostalCodeValid(input) {
  const postalCodePattern = /^[0-9]{2}-[0-9]{3}$/; // XX-XXX
  return postalCodePattern.test(input);
}
