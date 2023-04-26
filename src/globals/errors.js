export class HttpError extends Error {
  constructor ({ message, status }) {
    super(message)
    this.json = { message }
    this.status = status
  }
}

export class BadRequest extends HttpError {
  constructor ({ message = 'Format de requête invalide.', errors = [] }) {
    super({
      message,
      status: 400
    })
    this.json.errors = errors
  }
}

export class Unauthorized extends HttpError {
  constructor (message = 'Crédentials invalide.') {
    super({
      message,
      status: 401
    })
  }
}

export class Processing extends HttpError {
  constructor (message = 'En traitement.') {
    super({
      message,
      status: 102
    })
  }
}

export class Forbidden extends HttpError {
  constructor (message = 'Accès restreint.') {
    super({
      message,
      status: 403
    })
  }
}

export class TooManyRequests extends HttpError {
  constructor (
    message = "Veuillez attendre afin d'effectuer une nouvelle demande."
  ) {
    super({
      message,
      status: 429
    })
  }
}

export class NotFound extends HttpError {
  constructor (message = 'Ressource introuvable.') {
    super({
      message,
      status: 404
    })
  }
}

export class Conflict extends HttpError {
  constructor (message = 'Ressource déjà existante.') {
    super({
      message,
      status: 409
    })
  }
}
