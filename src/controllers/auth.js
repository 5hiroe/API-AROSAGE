import AuthValidator from "../validators/auth.js"
import AuthService from "../services/auth.js"
const AuthValidatorInstance = new AuthValidator()
const AuthServiceInstance = new AuthService()

export async function signup (req, res) {
    const { body } = req
    AuthValidatorInstance.validate(body, AuthValidatorInstance.signup)

    const jwt = await AuthServiceInstance.signup(body)
    return res.status(200).json({ 
        message: "Vous êtes bien inscrit !",
        jwt
    })
}

export async function login (req, res) {
    const { body } = req
    AuthValidatorInstance.validate(body, AuthValidatorInstance.login)

    const jwt = await AuthServiceInstance.login(body)
    return res.status(200).json({
        message: "Vous êtes bien connecté !",
        jwt
    })
}