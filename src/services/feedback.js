import { NotFound } from '../globals/errors.js'
import { Feedback } from '../models/feedback.js'
import { Keep } from '../models/keep.js'
import { Picture } from '../models/picture.js'

export default class FeedbackService {
  constructor () {
    if (FeedbackService.instance instanceof FeedbackService) {
      return FeedbackService.instance
    }
    Object.freeze(this)
    FeedbackService.instance = this
  }

  async createFeedback ({ fields }) {
    const keep = await Keep.findByPk(fields.keep_id)
    if (!keep) {
      throw new NotFound('La garde n\'existe pas.')
    }

    fields.date_feedback = new Date()
    fields.time_feedback = new Date().toISOString().substr(11, 8)

    const feedback = await Feedback.create(fields)
    return feedback
  }

  async getFeedbacksByKeep ({ id }) {
    const feedbacks = await Feedback.findAll({
      where: { keep_id: id },
      include: {
        model: Picture,
        as: 'Pictures',
        attributes: ['picture_path']
      }

    })
    return feedbacks
  }
}
