import FeedbackService from '../services/feedback.js'
import FeedbackValidator from '../validators/feedback.js'
const FeedbackServiceInstance = new FeedbackService()
const FeedbackValidatorInstance = new FeedbackValidator()

export async function createFeedback (req, res) {
  const fields = req.body
  FeedbackValidatorInstance.validate(req.body, FeedbackValidatorInstance.create)
  const feedback = await FeedbackServiceInstance.createFeedback({ fields })
  res.status(200).json({ message: 'Votre feedback a bien été enregistré.', feedback })
}

export async function getFeedbacksByKeep (req, res) {
  const { id } = req.params
  const feedbacks = await FeedbackServiceInstance.getFeedbacksByKeep({ id })
  res.status(200).json({
    message: 'Les feedbacks ont été récupérés.',
    feedbacks
  })
}
