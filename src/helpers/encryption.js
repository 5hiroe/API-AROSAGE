import crypto from 'crypto-js'

/**
 * Encrypt password.
 *
 * @param {String} password
 * @returns
 */
export function encrypt (password) {
  return crypto.AES.encrypt(password, process.env.KEY_ENCRYPTION).toString()
}

/**
 * Decrypt password.
 *
 * @param {String} password
 * @returns {Bool}
 */
export function decrypt (password) {
  const bytes = crypto.AES.decrypt(password, process.env.KEY_ENCRYPTION)
  console.log('bytes: ', bytes)
  return bytes.toString(crypto.enc.Utf8)
}

/**
 * Generate very basic password.
 *
 * @returns {String}
 */
export function generatePassword () {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const number = '123456789'
  let password = ''
  for (let i = 0; i < 6; i++) {
    password += lower.charAt(Math.floor(Math.random() * lower.length))
  }
  password += upper.charAt(Math.floor(Math.random() * upper.length))
  password += number.charAt(Math.floor(Math.random() * number.length))
  return password
}
