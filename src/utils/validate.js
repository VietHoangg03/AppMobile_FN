export function validateName(name) {
  const re = /^[A-Za-z\s]*$/;
  return re.test(name);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateConfirmPassword(coPassword, password) {
  return coPassword === password;
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateDate(testdate) {
  const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return date_regex.test(testdate);
}

export function validateImage(image) {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  return allowedExtensions.exec(image);
}

export function validateBirthday(birthday) {
  const [monthSplit, daySplit, yearSplit] = birthday.split('/');
  const month = +monthSplit;
  const day = +daySplit;
  const year = +yearSplit;

  const dayCheck = /^(0?[1-9]|[12][0-9]|3[01])$/;
  const monthCheck = /^([1-9]|1[0-2])$/;
  const yearCheck = /^\d{4}$/;

  if (monthCheck.test(month) && dayCheck.test(day) && yearCheck.test(year)) {
    if (month === 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) {
        leapYear = true;
      }
      if (leapYear === true && day > 29) {
        return 'February of leap year has up to 29 days';
      }
      if (leapYear === false && day > 28) {
        return 'February of non-leap year has up to 28 days';
      }
    }
  }

  return 'valid';
}
