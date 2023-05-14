import UserService from '../services/profile.js'
const UserServiceInstance = new UserService()

export async function getProfileById (req, res) {
  const userId = req.jwt.data.id
  const profile = await UserServiceInstance.getProfileById(userId)
  res.status(200).json({
    message: 'Le profil a été récupéré.',
    profile
  })
}

export async function putProfileById (req, res) {
  const fields = req.body
  const userId = req.jwt.data.id
  const user = await UserServiceInstance.putProfileById({ fields, userId })
  res.status(200).json({
    message: 'Le profil a été mis à jour.',
    user
  })
}

export async function deleteProfileById (req, res) {
  const userId = req.jwt.data.id
  await UserServiceInstance.deleteProfileById({ userId })
  res.status(200).json({ message: 'Le profile a été supprimée.' })
}
