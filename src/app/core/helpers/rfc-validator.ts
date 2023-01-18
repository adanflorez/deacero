import { RFC_PATTERN, ALPHABET } from '../constants';
import { AbstractControl } from '@angular/forms';

export const validateRFC = (
  input: Event,
  control: AbstractControl<unknown, unknown>
) => {
  const rfc = (input.target as HTMLInputElement).value.trim().toUpperCase();

  if (validRFC(rfc)) {
    control.updateValueAndValidity();
  } else {
    control.setErrors({ invalidRFC: true });
  }
};

function validRFC(rfc: string, acceptGeneric = true) {
  const re = RFC_PATTERN;
  const isValidated = rfc.match(re);

  if (!isValidated) return false;

  // Separate the check digit from the rest of the RFC
  const digitVerifier = isValidated.pop(),
    rfcWithoutDigit = isValidated.slice(1).join(''),
    len = rfcWithoutDigit.length,
    // Obtain the expected digit
    dictionary = ALPHABET,
    index = len + 1;
  let sum, digitExpected;

  if (len == 12) sum = 0;
  else sum = 481; // Adjustment for legal entity

  for (let i = 0; i < len; i++)
    sum += dictionary.indexOf(rfcWithoutDigit.charAt(i)) * (index - i);
  digitExpected = 11 - (sum % 11);
  if (digitExpected == 11) digitExpected = 0;
  else if (digitExpected == 10) digitExpected = 'A';

  // Does the check digit match the expected digit?
  // or is it a Generic RFC (sales to general public)?
  if (
    (digitVerifier != digitExpected &&
      (!acceptGeneric || rfcWithoutDigit + digitVerifier != 'XAXX010101000')) ||
    (!acceptGeneric && rfcWithoutDigit + digitVerifier == 'XEXX010101000')
  )
    return false;
  return rfcWithoutDigit + digitVerifier;
}

// DDS1203121S1
