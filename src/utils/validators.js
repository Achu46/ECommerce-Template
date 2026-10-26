export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidPostalCode(code) {
  if (!code || typeof code !== 'string') return false;
  return code.trim().length >= 3 && code.trim().length <= 10;
}

export function isPositiveNumber(val) {
  const num = typeof val === 'number' ? val : parseFloat(val);
  return !isNaN(num) && num > 0;
}

export function isNonNegativeNumber(val) {
  const num = typeof val === 'number' ? val : parseFloat(val);
  return !isNaN(num) && num >= 0;
}
