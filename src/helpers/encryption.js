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
  return bytes.toString(crypto.enc.Utf8)
}
