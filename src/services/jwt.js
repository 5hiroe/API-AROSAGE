import JsonWebToken from 'jsonwebtoken'

const LIMIT_JWTS = 5

export default class JWTService {
  /**
   * JWTService is a singleton.
   */
  constructor () {
    if (JWTService.instance instanceof JWTService) {
      return JWTService.instance
    }
    // Actives jwts.
    this.jwts = []
    Object.freeze(this)
    JWTService.instance = this
  }

  /**
   * Generate JWT and add it to the active jwts.
   *
   * @param {ObjectId} id
   */
  generate ({ id }) {
    const jwt = JsonWebToken.sign({ id }, process.env.JWT, { expiresIn: '30d' })
    this.add({ jwt, id })
    return jwt
  }

  /**
   * Return true if contained in jwts.
   *
   * @param {String} jwt
   * @returns
   */
  contain (jwt) {
    for (const active of this.jwts) {
      if (active.jwt === jwt) {
        return true
      }
    }
    return false
  }

  /**
   * Add a jwt.
   *
   * @param {String} jwt
   * @param {ObjectId} id
   * @returns
   */
  add ({ jwt, id }) {
    const newJWT = {
      jwt,
      id,
      date: Date.now()
    }
    // Limited to 5 (cf. LIMIT_JWTS).
    if (!this.isLimitReached(id)) {
      this.jwts.push(newJWT)
      return
    }
    // The date of the oldest jwt.
    let oldest
    // The index of the oldest jwt to remove.
    let index
    for (const i in this.jwts) {
      if (this.jwts[i].id === id) {
        // As oldest is undefined at the beginning, it will take first value.
        if (!oldest) {
          oldest = this.jwts[i].date
          index = i
        } else if (oldest > this.jwts[i].date) {
          index = i
          oldest = this.jwts[i].date
        }
      }
    }
    // Replace oldest jwt by the new one.
    if (index) {
      this.jwts.splice(index, 1)
      this.jwts.push(newJWT)
    }
  }

  /**
   * Remove a jwt.
   *
   * @param {String} jwt
   * @returns
   */
  remove (jwt) {
    let index
    for (const i in this.jwts) {
      if (this.jwts[i].jwt === jwt) {
        index = i
      }
    }
    if (index) {
      this.jwts.splice(index, 1)
    }
  }

  /**
   * Return true if the limit is reached.
   *
   * @param {ObjectId} id
   * @returns
   */
  isLimitReached (id) {
    let total = 0
    for (const jwt of this.jwts) {
      if (jwt.id === id.toString()) {
        total += 1
      }
    }
    return total >= LIMIT_JWTS
  }

  removeAll (id) {
    const activesJWT = this.jwts.filter(jwt => jwt.id === id)
    for (const jwt of activesJWT) {
      let index = -1
      for (const i in this.jwts) {
        if (this.jwts[i].jwt.id === jwt.jwt.id) {
          index = i
          break
        }
      }
      if (index !== -1) {
        this.jwts.splice(index, 1)
      }
    }
  }
}
