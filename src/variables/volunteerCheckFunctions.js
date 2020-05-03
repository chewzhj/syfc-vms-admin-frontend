
function checkNRIC(nric) {
  let isLegit = false;
  const nricWeight = [2, 7, 6, 5, 4, 3, 2];
  const nricCheck = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "Z",
    11: "J"
  };

  const lastNum = nric.slice(-1);
  const numberArray = Array.from(nric.slice(1, 8), Number);
  let weight = 0;
  for (var i = 0; i < numberArray.length; i++) {
    weight += nricWeight[i] * numberArray[i];
  }

  const finalNumCheck = 11 - (weight % 11);

  if (nricCheck[finalNumCheck] === lastNum) {
    isLegit = true;
  }
  return isLegit;
}
export function checkVolFields(
  name,
  email,
  password,
  dob,
  nric,
  address,
  postal,
  church,
  dept,
  gender,
  number,
  passwordCheck,
)
{
  const checks = (new Array(12)).fill(false)
  if (name.trim() !== '') {
    checks[0] = true
  }
  if (email.trim() !== '') {
    checks[1] = true
  }
  if (!passwordCheck || password.trim() !== '') {
    checks[2] = true
  }
  if (dob !== null) {
    checks[3] = true
  }
  if (nric.trim() !== '') {
    checks[4] = true
  }
  if (address.trim() !== '') {
    checks[5] = true
  }
  if (postal.trim() !== '') {
    checks[6] = true
  }
  if (church.trim() !== '') {
    checks[7] = true
  }
  if (dept.trim() !== '') {
    checks[8] = true
  }
  if (gender === 'M' || gender === 'F') {
    checks[9] = true
  }
  if (number.trim() !== '') {
    checks[10] = true
  }
  if (!checks[4] || checkNRIC(nric)) {
    checks[11] = true
  }

  return checks
}

export const errorMessages = [
  'Name is empty',
  'Email is invalid',
  'Password is empty',
  'Date of Birth is empty',
  'NRIC is empty',
  'Address is empty',
  'Postal is empty',
  'Church is empty',
  'Department is empty',
  'Gender is invalid',
  'Phone Number is empty',
  'NRIC is invalid'
]
